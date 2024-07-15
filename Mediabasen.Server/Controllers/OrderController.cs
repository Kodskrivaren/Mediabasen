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

        [ActivatorUtilitiesConstructor]
        public OrderController(IUnitOfWork unitOfWork, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var userId = GetUserId();

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
            var userId = GetUserId();

            Cart cart = GetUserCart();

            if (cart == null) return NotFound();

            var newOrder = new Order()
            {
                UserId = userId,
                OrderPlaced = DateTime.Now,
                OrderItems = new List<OrderItem>() { },
                TotalPrice = 0
            };

            foreach (var item in cart.CartProducts)
            {
                var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == item.ProductId);

                var orderItem = new OrderItem()
                {
                    ProductId = product.Id,
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

        private string GetUserId()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return ""; }

            return idClaim.ToString().Split(" ")[1];
        }

        private Cart GetUserCart(bool tracked = false)
        {
            var userId = GetUserId();

            return _unitOfWork.Cart.GetFirstOrDefault(u => u.UserId == userId, includeProperties: "CartProducts", tracked: tracked);
        }
    }
}
