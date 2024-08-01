using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.Order;
using Mediabasen.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ProductService _productService;
        private readonly UserService _userService;

        [ActivatorUtilitiesConstructor]
        public OrderController(IUnitOfWork unitOfWork, ProductService productService, UserService userService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var userId = _userService.GetUserId(HttpContext);

            var orders = _unitOfWork.Order.GetAll(u => u.UserId == userId, includeProperties: "OrderItems");

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
        public IActionResult PlaceOrder()
        {
            var userId = _userService.GetUserId(HttpContext);

            Cart cart = GetUserCart();

            if (cart == null) return NotFound();

            var success = _unitOfWork.Product.AttemptTakeFromStock(cart);

            if (!success)
            {
                Response.StatusCode = 400;
                return new JsonResult(new { message = "Du försökte beställa fler än som finns på lager!" });
            }

            var newOrder = new Order()
            {
                UserId = userId,
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

            return new JsonResult(newOrder);
        }

        private Cart GetUserCart(bool tracked = false)
        {
            var userId = _userService.GetUserId(HttpContext);

            return _unitOfWork.Cart.GetFirstOrDefault(u => u.UserId == userId, includeProperties: "CartProducts", tracked: tracked);
        }
    }
}
