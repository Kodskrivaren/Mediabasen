using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CartController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult GetCartForUser()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return BadRequest(); }

            string id = idClaim.ToString().Split(" ")[1];

            var cart = _unitOfWork.Cart.GetFirstOrDefault(u => u.UserId == id, includeProperties: "CartProducts");

            if (cart == null) { return NotFound(); }

            return new JsonResult(cart);
        }

        [HttpPost]
        public IActionResult AddProductToCart(int productId, int count)
        {
            var userId = GetUserId();

            if (userId == "") return NotFound();

            var cart = _unitOfWork.Cart.GetFirstOrDefault(u => u.UserId == userId, includeProperties: "CartProducts");

            if (cart == null)
            {
                cart = new Cart()
                {
                    Id = 0,
                    UserId = userId,
                    CartProducts = new List<CartProduct>()
                    {

                    }
                };

                _unitOfWork.Cart.Add(cart);
                _unitOfWork.Save();
            }

            var currentProduct = cart.CartProducts.FirstOrDefault(u => u.ProductId == productId);

            if (currentProduct == null)
            {
                cart.CartProducts.Add(new CartProduct()
                {
                    ProductId = productId,
                    Count = count
                });
            }
            else
            {
                currentProduct.Count = count;
            }


            _unitOfWork.Save();

            return new JsonResult(cart);
        }

        private string GetUserId()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return ""; }

            return idClaim.ToString().Split(" ")[1];
        }
    }
}
