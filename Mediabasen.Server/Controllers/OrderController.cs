using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private IUnitOfWork _unitOfWork;

        [ActivatorUtilitiesConstructor]
        public OrderController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
                OrderItems = new List<OrderItem>() { }
            };

            foreach (var item in cart.CartProducts)
            {
                var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == item.ProductId);

                newOrder.OrderItems.Add(new OrderItem()
                {
                    ProductId = product.Id,
                    Amount = item.Count,
                    Price = product.Price,
                    Discount = product.Discount,
                });
            }

            _unitOfWork.Order.Add(newOrder);
            _unitOfWork.Save();

            _unitOfWork.Cart.Remove(cart);
            _unitOfWork.Save();

            return Ok();
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
