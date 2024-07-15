using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Music;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MusicController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ImageService _imageService;

        public MusicController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment, ImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
            _imageService = imageService;
        }

        [HttpPost]
        [ActionName("AddMusic")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddMusic(MusicPost music)
        {
            if (!ModelState.IsValid) return new JsonResult(new { Message = "Invalid data!" });

            var productType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Music);

            var newMusic = new ProductMusic()
            {
                Name = music.Name,
                Description = music.Description,
                Price = music.Price,
                Discount = music.Discount,
                ArtistId = music.ArtistId,
                LabelId = music.LabelId,
                PublisherId = music.PublisherId,
                FormatId = music.FormatId,
                ProductTypeId = productType.Id,
                ReleaseDate = music.ReleaseDate,
                AddedToStoreDate = DateTime.Now,
            };

            _unitOfWork.ProductMusic.Add(newMusic);
            _unitOfWork.Save();

            if (music.GenreIds != null && music.GenreIds.Count() > 0)
            {
                foreach (int genreId in music.GenreIds)
                {
                    _unitOfWork.ProductGenre.Add(
                        new ProductGenre()
                        {
                            ProductId = newMusic.Id,
                            GenreId = genreId
                        });
                }
                _unitOfWork.Save();
            }

            if (music.Images != null && music.Images.Count() > 0)
            {
                _imageService.SaveImages(music.Images, newMusic, "music");
            }

            return new JsonResult(new { message = "Skivan har lagts till!" });
        }
    }
}
