using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Order;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ProductService _productService;
        private readonly UserService _userService;
        private readonly CartService _cartService;

        [ActivatorUtilitiesConstructor]
        public OrderController(IUnitOfWork unitOfWork, ProductService productService, UserService userService, CartService cartService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _userService = userService;
            _cartService = cartService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetOrderCounts()
        {
            var userId = _userService.GetUserId(HttpContext);

            int shippedOrdersCount = _unitOfWork.Order.GetAll((u) => u.UserId == userId && u.OrderShipped != null).Count();

            int unshippedOrdersCount = _unitOfWork.Order.GetAll((u) => u.UserId == userId && u.OrderShipped == null).Count();

            return new JsonResult(new { shippedOrdersCount, unshippedOrdersCount });
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

            return new JsonResult(newOrder);
        }
    }
}
