using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.Product;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ProductService _productService;
        private readonly CartService _cartService;
        private readonly UserService _userService;

        public CartController(IUnitOfWork unitOfWork, ProductService productService, CartService cartService, UserService userService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _cartService = cartService;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetProductSuggestions()
        {
            string cartId = Request.Cookies[SD.Cart_Id_Cookie];

            var cart = _cartService.GetCart(cartId);

            if (cart == null) { return NotFound(); }

            var productIds = cart.CartProducts.Select(p => p.ProductId).ToList();

            var totalSimilarProducts = _unitOfWork.Product.GetAll(u => productIds.Contains(u.Id));

            List<Product[]> productsLists = new List<Product[]>();

            foreach (var product in totalSimilarProducts)
            {
                product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

                productsLists.Add(_productService.GetSimilarProducts(product).ToArray());
            }

            List<Product> similarProducts = new List<Product>();

            foreach (var list in productsLists)
            {
                foreach (var product in list)
                {
                    if (productIds.Contains(product.Id) || similarProducts.Find(u => u.Id == product.Id) != null) continue;
                    similarProducts.Add(product);
                    if (similarProducts.Count == SD.Items_Per_Search_Page) break;
                }

                if (similarProducts.Count == SD.Items_Per_Search_Page) break;
            }

            return new JsonResult(new { similarProducts });
        }

        [HttpGet]
        public IActionResult GetCartForUser()
        {
            string cartId = Request.Cookies[SD.Cart_Id_Cookie];

            var cart = _cartService.GetCart(cartId);

            if (cart == null) { return NotFound(); }

            return new JsonResult(cart);
        }

        [HttpGet]
        public IActionResult GetCartProductsForUser()
        {
            var cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie], false);

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
                var dbCart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie], true);
                cart.CartProducts = cart.CartProducts.Where(u => !productsToRemove.Contains(u)).ToList();
                dbCart.CartProducts = cart.CartProducts.Where(u => !productsToRemove.Contains(u)).ToList();
                _unitOfWork.Cart.Update(dbCart);
                _unitOfWork.Save();
            }

            return new JsonResult(cart.CartProducts);
        }

        [HttpPost]
        public IActionResult IncreaseProductCount(int productId)
        {
            var cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie]);

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
            var cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie], true);

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

                    Response.Cookies.Delete(SD.Cart_Id_Cookie);
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
            var cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie], true);

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
                Response.Cookies.Delete(SD.Cart_Id_Cookie);
                return Ok();
            }

            return new JsonResult(cart);
        }

        [HttpPost]
        public IActionResult AddProductToCart(int productId, int count)
        {
            var userId = _userService.GetUserId(HttpContext);

            var cart = _cartService.GetCart(Request.Cookies[SD.Cart_Id_Cookie]);

            if (Request.Cookies[SD.Cart_Id_Cookie] == null)
            {
                DateTime expireDate = DateTime.Now.AddDays(7);
                CookieOptions option = new CookieOptions();
                option.Expires = expireDate;
                option.HttpOnly = true;

                cart = new Cart()
                {
                    Id = 0,
                    UserId = userId != "" ? userId : null,
                    Expires = expireDate,
                    CartProducts = new List<CartProduct>()
                    {

                    }
                };

                _unitOfWork.Cart.Add(cart);
                _unitOfWork.Save();

                Response.Cookies.Append(SD.Cart_Id_Cookie, cart.Id.ToString(), option);
            }
            else if (cart == null)
            {
                Response.Cookies.Delete(SD.Cart_Id_Cookie);
                return BadRequest();
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
    }
}
