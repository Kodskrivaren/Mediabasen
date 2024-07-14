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

        public MovieController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
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
                var imageService = new ImageService(_webHostEnvironment, _unitOfWork);

                imageService.SaveImages(movie.Images, newMovie, "movie");
            }

            return new JsonResult(new { message = "Filmen har lagts till!" });
        }
    }
}
