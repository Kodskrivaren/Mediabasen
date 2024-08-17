using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Server.Services;
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
        private readonly ProductService _productService;

        public CartController(IUnitOfWork unitOfWork, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
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
            var cart = GetUserCart(false);

            if (cart == null) { return NotFound(); }

            List<CartProduct> productsToRemove = new List<CartProduct>();

            foreach (var cartProduct in cart.CartProducts)
            {
                cartProduct.Product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == cartProduct.ProductId);

                if (cartProduct.Product == null)
                {
                    productsToRemove.Add(cartProduct);
                }
                else
                {
                    _productService.SetBasicProperties(cartProduct.Product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == cartProduct.Product.ProductTypeId));
                }
            }

            if (productsToRemove.Count > 0)
            {
                var dbCart = GetUserCart(true);
                cart.CartProducts = cart.CartProducts.Where(u => !productsToRemove.Contains(u)).ToList();
                dbCart.CartProducts = cart.CartProducts.Where(u => !productsToRemove.Contains(u)).ToList();
                Console.WriteLine(dbCart.CartProducts.Count);
                _unitOfWork.Cart.Update(dbCart);
                _unitOfWork.Save();
            }

            return new JsonResult(cart.CartProducts);
        }

        [HttpPost]
        public IActionResult IncreaseProductCount(int productId)
        {
            var cart = GetUserCart();

            if (cart == null) { return NotFound(); }

            var cartProduct = cart.CartProducts.FirstOrDefault(u => u.ProductId == productId);

            if (cartProduct == null) { return NotFound(); }

            cartProduct.Count++;
            _unitOfWork.Cart.Update(cart);
            _unitOfWork.Save();

            return new JsonResult(cart);
        }

        [HttpPost]
        public IActionResult DecreaseProductCount(int productId)
        {
            var cart = GetUserCart(true);

            if (cart == null) { return NotFound(); }

            var cartProduct = cart.CartProducts.Where(u => u.ProductId == productId).ToList().First();

            if (cartProduct == null) { return NotFound(); }

            cartProduct.Count--;

            if (cartProduct.Count == 0)
            {
                cart.CartProducts.Remove(cartProduct);
                _unitOfWork.Cart.Update(cart);
                _unitOfWork.Save();
                if (cart.CartProducts.Count == 0)
                {
                    _unitOfWork.Cart.Remove(cart);
                    _unitOfWork.Save();
                    return new JsonResult(new { message = "Kundvagnen har tömts!" });
                }
            }
            else
            {
                _unitOfWork.Cart.Update(cart);
                _unitOfWork.Save();
            }

            return new JsonResult(cart);
        }

        [HttpDelete]
        public IActionResult RemoveProductFromCart(int cartProductId)
        {
            var cart = GetUserCart(true);

            if (cart == null) { return NotFound(); }

            var foundCartProduct = cart.CartProducts.Where(u => u.Id == cartProductId).ToList().First();

            if (foundCartProduct == null) { return NotFound(); }

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
