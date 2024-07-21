using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Movie;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ImageService _imageService;
        private readonly ProductService _productService;

        [ActivatorUtilitiesConstructor]
        public MovieController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment, ImageService imageService, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
            _imageService = imageService;
            _productService = productService;
        }

        [HttpPost]
        [ActionName("AddMovie")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddMovie(MoviePost movie)
        {
            if (!ModelState.IsValid) return new JsonResult(new { Message = "Invalid data!" });

            var productType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Movie);

            var newMovie = new ProductMovie()
            {
                Name = movie.Name,
                Description = movie.Description,
                Price = movie.Price,
                Discount = movie.Discount,
                DirectorNameId = movie.DirectorId,
                FormatId = movie.FormatId,
                ProductTypeId = productType.Id,
                ReleaseDate = movie.ReleaseDate,
                AddedToStoreDate = DateTime.Now,
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

            if (movie.GenreIds != null && movie.GenreIds.Count() > 0)
            {
                foreach (int genreId in movie.GenreIds)
                {
                    _unitOfWork.ProductGenre.Add(
                        new ProductGenre()
                        {
                            ProductId = newMovie.Id,
                            GenreId = genreId
                        });
                }
                _unitOfWork.Save();
            }

            if (movie.Images != null && movie.Images.Count() > 0)
            {
                _imageService.SaveImages(movie.Images, newMovie, "movie");
            }

            return new JsonResult(new { message = "Filmen har lagts till!" });
        }

        [HttpPatch]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult UpdateMovie(MoviePost product)
        {
            var movie = _unitOfWork.ProductMovie.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            if (movie == null) return NotFound();

            movie.Name = product.Name;
            movie.Description = product.Description;
            movie.Price = product.Price;
            movie.Discount = product.Discount;
            movie.ReleaseDate = product.ReleaseDate;
            movie.FormatId = product.FormatId;

            movie.DirectorNameId = product.DirectorId;

            if (product.ActorIds != null && product.ActorIds.Count > 0)
            {
                UpdateMovieActors(product, movie);
            }
            else
            {
                var movieActors = _unitOfWork.MovieActor.GetAll(u => u.ProductMovieId == product.Id);

                if (movieActors != null)
                {
                    _unitOfWork.MovieActor.RemoveRange(movieActors);
                    _unitOfWork.Save();
                }
            }

            if (product.GenreIds != null && product.GenreIds.Count > 0)
            {
                _productService.UpdateProductGenres(movie, product.GenreIds);
            }

            if (product.Images != null && product.Images.Count() > 0)
            {
                _imageService.UpdateImages(product.Images, movie, "music");
            }
            else
            {
                var images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == movie.Id).ToList();

                foreach (var image in images)
                {
                    _imageService.RemoveImage(image);
                }

                _unitOfWork.ProductImage.RemoveRange(images);
                _unitOfWork.Save();
            }

            _unitOfWork.ProductMovie.Update(movie);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Ändringarna har sparats!" });
        }

        private void UpdateMovieActors(MoviePost product, ProductMovie movie)
        {
            var movieActors = _unitOfWork.MovieActor.GetAll(u => u.ProductMovieId == product.Id).ToList();

            List<MovieActor> movieActorsToAdd = new List<MovieActor>();
            List<MovieActor> searchedActors = new List<MovieActor>();

            foreach (var movieActorId in product.ActorIds)
            {
                var foundName = movieActors.Find(u => u.NameId == movieActorId);

                if (foundName == null)
                {
                    movieActorsToAdd.Add(new MovieActor() { ProductMovieId = movie.Id, NameId = movieActorId });
                }
                else
                {
                    searchedActors.Add(foundName);
                }
            }

            foreach (var movieActor in movieActors)
            {
                var foundGenre = searchedActors.Find(u => u.Id == movieActor.Id);

                if (foundGenre == null)
                {
                    _unitOfWork.MovieActor.Remove(movieActor);
                    _unitOfWork.Save();
                }
            }

            if (movieActorsToAdd.Count > 0)
            {
                foreach (var movieActor in movieActorsToAdd)
                {
                    _unitOfWork.MovieActor.Add(movieActor);
                    _unitOfWork.Save();
                }
            }
        }
    }
}
