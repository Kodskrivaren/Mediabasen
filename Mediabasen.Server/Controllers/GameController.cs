using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Game;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ImageService _imageService;
        public GameController(IUnitOfWork unitOfWork, ImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        [HttpPost]
        [ActionName("AddGame")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddGame(GamePost game)
        {
            if (!ModelState.IsValid) return new JsonResult(new { Message = "Invalid data!" });

            var productType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Game);

            var newGame = new ProductGame()
            {
                Name = game.Name,
                Description = game.Description,
                Price = game.Price,
                Discount = game.Discount,
                FormatId = game.FormatId,
                ProductTypeId = productType.Id,
                ReleaseDate = game.ReleaseDate,
                AddedToStoreDate = DateTime.Now,
                DeveloperId = game.DeveloperId,
                PublisherId = game.PublisherId,
            };

            _unitOfWork.ProductGame.Add(newGame);
            _unitOfWork.Save();

            if (game.GenreIds != null && game.GenreIds.Count() > 0)
            {
                foreach (int genreId in game.GenreIds)
                {
                    _unitOfWork.ProductGenre.Add(
                        new ProductGenre()
                        {
                            ProductId = newGame.Id,
                            GenreId = genreId
                        });
                }
                _unitOfWork.Save();
            }

            if (game.Images != null && game.Images.Count() > 0)
            {
                _imageService.SaveImages(game.Images, newGame, "game");
            }

            return new JsonResult(new { message = "Spelet har lagts till!" });
        }
    }
}
