using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Movie;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

        [ActivatorUtilitiesConstructor]
        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            List<Product> products = _unitOfWork.Product.GetAll().ToList();
            foreach (var product in products)
            {
                product.Images = GetProductImages(product);

                product.Format = _unitOfWork.Format.GetFirstOrDefault(u => u.Id == product.FormatId);
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        private List<ProductImage> GetProductImages(Product product)
        {
            List<ProductImage> Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id).ToList();
            foreach (var image in Images)
            {
                image.Product = null;
            }

            return Images;
        }

        private ProductMovie GetProductMovie(Product product)
        {
            var movie = _unitOfWork.ProductMovie.GetFirstOrDefault(u => u.Id == product.Id);

            movie.Images = GetProductImages(movie);

            movie.Format = _unitOfWork.Format.GetFirstOrDefault(u => u.Id == movie.FormatId);

            movie.ProductType = product.ProductType;

            movie.Director = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == movie.DirectorNameId);

            var movieActorIds = _unitOfWork.MovieActor.GetAll(u => u.ProductMovieId == movie.Id).ToList();

            movie.Actors = _unitOfWork.Name.GetAll().Where(name => movieActorIds.Find(movieActor => name.Id == movieActor.NameId) != null).ToList();

            var productGenres = _unitOfWork.ProductGenre.GetAll(u => u.ProductId == movie.Id).ToList();

            movie.Genres = _unitOfWork.Genre.GetAll().Where(genre => productGenres.Find(productGenre => productGenre.GenreId == genre.Id) != null).ToList();

            return movie;
        }

        [HttpGet]
        public IActionResult GetProductById(int productId)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == productId);

            if (product == null) return NotFound();

            product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

            switch (product.ProductType.Name)
            {
                case SD.Type_Movie:
                    return new JsonResult(GetProductMovie(product));

                default:
                    return new JsonResult(product);
            }
        }

        [HttpDelete]
        [Authorize(Roles = SD.Role_Admin)]
        [ActionName("DeleteAll")]
        public IActionResult DeleteAll()
        {
            var products = _unitOfWork.Product.GetAll().ToList();

            foreach (var product in products)
            {
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
