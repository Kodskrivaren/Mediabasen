using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
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
            var cart = GetUserCart();

            if (cart == null) { return NotFound(); }

            return new JsonResult(cart);
        }

        [HttpGet]
        public IActionResult GetCartProductsForUser()
        {
            var cart = GetUserCart();

            if (cart == null) { return NotFound(); }

            foreach (var cartProduct in cart.CartProducts)
            {
                cartProduct.Product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == cartProduct.ProductId);

                cartProduct.Product.Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == cartProduct.ProductId).ToList();

                cartProduct.Product.Format = _unitOfWork.Format.GetFirstOrDefault(u => u.Id == cartProduct.Product.FormatId);
            }

            return new JsonResult(cart.CartProducts);
        }

        [HttpDelete]
        public IActionResult RemoveProductFromCart(int cartProductId)
        {
            var cart = GetUserCart(true);

            if (cart == null) { return NotFound(); }

            var foundCartProduct = cart.CartProducts.Where(u => u.Id == cartProductId).ToList().First();

            cart.CartProducts.Remove(foundCartProduct);

            _unitOfWork.Cart.Update(cart);
            _unitOfWork.Save();

            if (cart.CartProducts.Count() == 0)
            {
                _unitOfWork.Cart.Remove(cart);
                _unitOfWork.Save();
                return Ok();
            }

            return new JsonResult(cart);
        }

        [HttpPost]
        public IActionResult AddProductToCart(int productId, int count)
        {
            var userId = GetUserId();

            if (userId == "") return NotFound();

            var cart = GetUserCart();

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
                    Id = 0,
                    CartId = cart.Id,
                    ProductId = productId,
                    Count = count
                });
            }
            else
            {
                currentProduct.Count = count;
            }

            _unitOfWork.Cart.Update(cart);

            _unitOfWork.Save();

            return new JsonResult(cart);
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
