﻿using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Order;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Mediabasen.Server.Services.ProductService _productService;
        private readonly UserService _userService;
        private readonly CartService _cartService;
        private readonly ConfigurationManager _configurationManager;
        private readonly EmailService _emailService;

        [ActivatorUtilitiesConstructor]
        public OrderController(IUnitOfWork unitOfWork, Mediabasen.Server.Services.ProductService productService, UserService userService, CartService cartService, ConfigurationManager configurationManager, EmailService emailService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _userService = userService;
            _cartService = cartService;
            _configurationManager = configurationManager;
            _emailService = emailService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetOrderCounts()
        {
            var userId = _userService.GetUserId(HttpContext);

            int shippedOrdersCount = _unitOfWork.Order.GetAll((u) => u.UserId == userId && u.OrderShipped != null).Count();

            int unshippedOrdersCount = _unitOfWork.Order.GetAll((u) => u.UserId == userId && u.OrderShipped == null && u.Paid).Count();

            int reservedOrdersCount = _unitOfWork.Order.GetAll((u) => u.UserId == userId && !u.Paid).Count();

            return new JsonResult(new { shippedOrdersCount, unshippedOrdersCount, reservedOrdersCount });
        }

        [HttpGet]
        public IActionResult GetOrderById(Guid orderId)
        {
            var order = _unitOfWork.Order.GetFirstOrDefault(u => u.Id == orderId, includeProperties: "OrderItems,GuestDetails");

            if (order == null) return NotFound();

            if (order.Paid == false && order.StripeId != null)
            {
                var service = new SessionService();

                var session = service.Get(order.StripeId);

                if (session.PaymentStatus == "paid")
                {
                    order.Paid = true;
                    _unitOfWork.Order.Update(order);
                    _unitOfWork.Save();

                    var userEmail = order.UserId != null ? _userService.GetUserEmailById(order.UserId) : order.GuestDetails.Email;

                    var test = _emailService.SendPaymentConfirmation(userEmail, order);
                }
            }

            foreach (var item in order.OrderItems)
            {
                item.Product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == item.ProductId);

                item.Product.Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == item.ProductId).ToList();
            }

            return new JsonResult(order);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetOrders(string? filter, int page = 1)
        {
            if (page < 1) { return BadRequest(); }

            var userId = _userService.GetUserId(HttpContext);

            IEnumerable<Order> orders = new List<Order>();

            if (filter != null && filter != "all")
            {
                switch (filter)
                {
                    case "unpaid":
                        orders = _unitOfWork.Order
                            .GetAll(u => u.UserId == userId && u.Paid == false, includeProperties: "OrderItems")
                            .OrderByDescending(u => u.OrderPlaced)
                            .Skip((page - 1) * 3)
                            .Take(3);
                        break;
                    case "shipped":
                        orders = _unitOfWork.Order
                            .GetAll(u => u.UserId == userId && u.OrderShipped != null, includeProperties: "OrderItems")
                            .OrderByDescending(u => u.OrderPlaced)
                            .Skip((page - 1) * 3)
                            .Take(3);
                        break;
                    case "unshipped":
                        orders = _unitOfWork.Order
                            .GetAll(u => u.UserId == userId && u.OrderShipped == null, includeProperties: "OrderItems")
                            .OrderByDescending(u => u.OrderPlaced)
                            .Skip((page - 1) * 3)
                            .Take(3);
                        break;
                }
            }
            else
            {
                orders = _unitOfWork.Order
                    .GetAll(u => u.UserId == userId, includeProperties: "OrderItems")
                    .OrderByDescending(u => u.OrderPlaced)
                    .Skip((page - 1) * 3)
                    .Take(3);
            }

            foreach (var order in orders)
            {
                foreach (var item in order.OrderItems)
                {
                    item.Product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == item.ProductId);

                    item.Product.Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == item.ProductId).ToList();
                }
            }

            return new JsonResult(orders);
        }

        [HttpPost]
        public IActionResult PayOrder(Guid orderId)
        {
            var order = _unitOfWork.Order.GetFirstOrDefault(u => u.Id == orderId, includeProperties: "OrderItems");

            if (order == null) return NotFound();

            var service = new SessionService();

            Session session;

            if (order.StripeId == null)
            {
                var options = new SessionCreateOptions
                {
                    LineItems =
                        order.OrderItems.Select(item =>
                            {
                                var lineItem = new SessionLineItemOptions();

                                var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == item.ProductId);

                                lineItem.PriceData = new SessionLineItemPriceDataOptions
                                {
                                    Currency = "sek",
                                    ProductData = new SessionLineItemPriceDataProductDataOptions
                                    {
                                        Name = product.Name,
                                    },
                                    UnitAmount = (long)_productService.GetCalculatedDiscountedPrice(product) * 100,
                                };

                                lineItem.Quantity = item.Amount;

                                return lineItem;
                            })
                        .ToList()
                    ,
                    Mode = "payment"
                };

                string redirectBaseUrl = _configurationManager.GetSection("GeneralSettings")["BaseUrl"];

                options.SuccessUrl = $"{redirectBaseUrl}/order?orderId={order.Id}";
                options.CancelUrl = $"{redirectBaseUrl}/order?orderId={order.Id}";

                session = service.Create(options);

                order.StripeId = session.Id;
                _unitOfWork.Order.Update(order);
                _unitOfWork.Save();
            }
            else
            {
                session = service.Get(order.StripeId);
            }

            return new JsonResult(new { stripeUrl = session.Url });
        }

        [HttpPost]
        public IActionResult PlaceOrder(PlaceOrderPost? guestPost)
        {
            string cartCookieId = Request.Cookies[SD.Cart_Id_Cookie];

            if (cartCookieId == null) { return BadRequest(); }

            var userId = _userService.GetUserId(HttpContext);

            if (userId == "" && guestPost == null) return BadRequest();

            Cart cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie]);

            if (cart == null) return NotFound();

            if (userId == "" && (guestPost == null || ModelState.ErrorCount > 0))
            {
                return BadRequest();
            }

            var success = _unitOfWork.Product.AttemptTakeFromStock(cart);

            if (!success)
            {
                Response.StatusCode = 400;
                return new JsonResult(new { message = "Du försökte beställa fler än som finns på lager!" });
            }

            if (userId == "" && guestPost != null)
            {
                guestPost.Id = 0;
            }

            var newOrder = new Order()
            {
                UserId = userId != "" ? userId : null,
                GuestDetails = userId == "" ? guestPost : null,
                OrderPlaced = DateTime.Now,
                OrderItems = new List<OrderItem>() { },
                TotalPrice = 0
            };

            var productIds = cart.CartProducts.Select(u => u.ProductId).ToList();

            var products = _unitOfWork.Product.GetAll(u => productIds.Contains(u.Id));

            foreach (var product in products)
            {
                var item = cart.CartProducts.FirstOrDefault(u => u.ProductId == product.Id);

                var orderItem = new OrderItem()
                {
                    ProductId = product.Id,
                    Product = product,
                    Amount = item.Count,
                    Price = product.Discount != 0 ? _productService.GetCalculatedDiscountedPrice(product) : product.Price,
                };

                newOrder.OrderItems.Add(orderItem);

                newOrder.TotalPrice += orderItem.Price * orderItem.Amount;
            }

            _unitOfWork.Order.Add(newOrder);
            _unitOfWork.Save();

            _unitOfWork.Cart.Remove(cart);
            _unitOfWork.Save();
            Response.Cookies.Delete(SD.Cart_Id_Cookie);

            string toEmail = userId != "" ? _userService.GetUserEmailById(userId) : guestPost.Email;

            var test = _emailService.SendOrderConfirmation(toEmail, newOrder, products.ToList());

            return new JsonResult(newOrder);
        }
    }
}
