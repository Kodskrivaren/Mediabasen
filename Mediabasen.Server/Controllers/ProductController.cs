using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Movie;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;

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
                product.Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id).ToList();
                foreach (var image in product.Images)
                {
                    image.Product = null;
                }
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        [HttpPost]
        [ActionName("AddMovie")]
        public IActionResult AddMovie(MoviePost movie)
        {
            if (!ModelState.IsValid) return new JsonResult(new { Message = "Invalid data!" });

            var newMovie = new ProductMovie()
            {
                Name = movie.Name,
                Description = movie.Description,
                Price = movie.Price,
                Discount = movie.Discount,
                DirectorNameId = movie.DirectorId,
            };

            _unitOfWork.ProductMovie.Add(newMovie);
            _unitOfWork.Save();
            if (movie.ActorIds != null && movie.ActorIds.Count() > 0)
            {
                foreach (var actorId in movie.ActorIds)
                {
                    _unitOfWork.MovieActor.Add(
                        new MovieActor()
                        {
                            ProductMovieId = newMovie.Id,
                            NameId = actorId
                        });
                }
                _unitOfWork.Save();
            }

            if (movie.Images != null && movie.Images.Count() > 0)
            {
                var wwwRoot = _webHostEnvironment.WebRootPath;
                foreach (var image in movie.Images)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    string productPath = @"images\movie\movie-" + newMovie.Id;
                    string finalPath = Path.Combine(wwwRoot, productPath);

                    if (!Directory.Exists(finalPath))
                    {
                        Directory.CreateDirectory(finalPath);
                    }

                    using (var fileStream = new FileStream(Path.Combine(finalPath, fileName), FileMode.Create))
                    {
                        image.CopyTo(fileStream);
                    }

                    ProductImage productImage = new ProductImage()
                    {
                        ImageUrl = @"\" + productPath + @"\" + fileName,
                        ProductId = newMovie.Id,
                    };

                    _unitOfWork.ProductImage.Add(productImage);
                }
                _unitOfWork.Save();
            }

            return new JsonResult(new { message = "Movie added!" });
        }
    }
}
