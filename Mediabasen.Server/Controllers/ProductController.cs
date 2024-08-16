using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ProductService _productService;
        private readonly UserService _userService;


        [ActivatorUtilitiesConstructor]
        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment, ProductService productService, UserService userService)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
            _productService = productService;
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetNewestProducts()
        {
            List<Product> products = _unitOfWork.Product.GetNewestProducts().ToList();
            foreach (var product in products)
            {
                _productService.SetBasicProperties(product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId));
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        [HttpGet]
        public IActionResult GetProductTypes()
        {
            var productTypes = _unitOfWork.ProductType.GetAll().ToList();

            return new JsonResult(productTypes);
        }

        [HttpGet]
        public IActionResult SearchProducts(string query)
        {
            List<Product> products = _unitOfWork.Product.SearchProducts(query).ToList();
            foreach (var product in products)
            {
                _productService.SetBasicProperties(product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId));
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        [HttpGet]
        public IActionResult ProductsOnSale()
        {
            List<Product> products = _unitOfWork.Product.ProductsOnSale().ToList();
            foreach (var product in products)
            {
                _productService.SetBasicProperties(product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId));
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        [HttpGet]
        public IActionResult GetGenresForProductType(int productTypeId)
        {
            var results = _unitOfWork.Product.GetGenresForProductType(productTypeId);

            return new JsonResult(new { results });
        }

        [HttpGet]
        public IActionResult FullSearchProducts(string? query, int? productTypeId, int? page, int? genreId)
        {
            var results = _unitOfWork.Product.FullSearchProducts(query, productTypeId, page, genreId);

            List<Product> products = results.Products.ToList();
            foreach (var product in products)
            {
                _productService.SetBasicProperties(product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId));
            }
            JsonResult res = new JsonResult(new { products, totalHits = results.TotalHits });
            return res;
        }

        [HttpGet]
        public IActionResult GetSimilarProductsById(int productId)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == productId);

            if (product == null) return NotFound();

            product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

            switch (product.ProductType.Name)
            {
                case SD.Type_Movie:
                    var movie = _productService.GetProductMovie(product);

                    var similarMovies = _unitOfWork.ProductMovie
                        .GetAll(u => u.Id != movie.Id && (u.DirectorNameId == movie.DirectorNameId))
                        .ToList()
                        .Select(_productService.GetProductMovie);

                    return new JsonResult(new { products = similarMovies });
                case SD.Type_Music:
                    var music = _productService.GetProductMusic(product);

                    var similarMusic = _unitOfWork.ProductMusic
                        .GetAll(u => u.Id != music.Id && (u.ArtistId == music.ArtistId || u.PublisherId == music.PublisherId))
                        .ToList()
                        .Select(_productService.GetProductMusic);

                    return new JsonResult(new { products = similarMusic });
                case SD.Type_Book:
                    var book = _productService.GetProductBook(product);
                    var similarBooks = _unitOfWork.ProductBook
                        .GetAll(u => u.Id != book.Id && (u.AuthorId == book.AuthorId))
                        .ToList()
                        .Select(_productService.GetProductBook);
                    return new JsonResult(new { products = similarBooks });
                case SD.Type_Game:
                    var game = _productService.GetProductGame(product);

                    var similarGames = _unitOfWork.ProductGame
                        .GetAll(u => u.Id != game.Id && (u.DeveloperId == game.DeveloperId || game.FormatId == u.FormatId))
                        .OrderBy(u => u.DeveloperId == game.DeveloperId ? -1 : 1)
                        .ToList()
                        .Select(_productService.GetProductGame);

                    return new JsonResult(new { products = similarGames });
                default:
                    HttpContext.Response.StatusCode = 400;
                    return new JsonResult(new { message = "Unkown product type!" });
            }
        }

        [HttpGet]
        public IActionResult GetProductById(int productId)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == productId, includeProperties: "Reviews");

            if (product == null) return NotFound();

            product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

            switch (product.ProductType.Name)
            {
                case SD.Type_Movie:
                    return new JsonResult(_productService.GetProductMovie(product));
                case SD.Type_Music:
                    return new JsonResult(_productService.GetProductMusic(product));
                case SD.Type_Book:
                    return new JsonResult(_productService.GetProductBook(product));
                case SD.Type_Game:
                    return new JsonResult(_productService.GetProductGame(product));
                default:
                    return new JsonResult(product);
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult PostReview(int productId, decimal rating, string content)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == productId, includeProperties: "Reviews");

            if (product == null) return NotFound();

            if (product.Reviews == null)
            {
                product.Reviews = new List<ProductReview>();
            }

            string userId = _userService.GetUserId(HttpContext);

            var currentReview = product.Reviews.Find(r => r.UserId == userId);

            if (currentReview != null)
            {
                return BadRequest();
            }

            var review = new ProductReview() { UserId = userId, Rating = rating, Content = content };

            product.Reviews.Add(review);
            _unitOfWork.Product.Update(product);
            _unitOfWork.Save();

            return new JsonResult(review);
        }

        [HttpPost]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult UploadProducts(IFormFile file)
        {
            var stream = file.OpenReadStream();
            using (var package = new ExcelPackage(stream))
            {
                var worksheet = package.Workbook.Worksheets.First();
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    _productService.TryAddProductFromExcel(worksheet, row);
                }
            }

            return Ok();
        }

        [HttpDelete]
        [Authorize(Roles = SD.Role_Admin)]
        [ActionName("DeleteAll")]
        public IActionResult DeleteAll()
        {
            var products = _unitOfWork.Product.GetAll(includeProperties: "Reviews").ToList();

            foreach (var product in products)
            {
                product.Reviews = null;

                _unitOfWork.Product.Update(product);

                _unitOfWork.Save();

                var images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id);

                if (images != null && images.Count() > 0)
                {
                    var rootPath = _webHostEnvironment.WebRootPath;

                    foreach (var image in images)
                    {
                        var path = Path.Join(rootPath, image.ImageUrl);

                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }

                        _unitOfWork.ProductImage.Remove(image);
                    }
                }

                _unitOfWork.Product.Remove(product);
            }

            _unitOfWork.Save();

            return Ok();
        }
    }
}
