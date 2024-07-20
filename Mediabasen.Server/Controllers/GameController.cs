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
        private readonly ProductService _productService;
        public GameController(IUnitOfWork unitOfWork, ImageService imageService, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
            _productService = productService;
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

        [HttpPatch]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult UpdateGame(GamePost product)
        {
            var game = _unitOfWork.ProductGame.GetFirstOrDefault(u => u.Id == product.Id);

            if (game == null) return NotFound();

            game.Name = product.Name;
            game.Description = product.Description;
            game.Price = product.Price;
            game.Discount = product.Discount;
            game.ReleaseDate = product.ReleaseDate;
            game.FormatId = product.FormatId;

            game.DeveloperId = product.DeveloperId;
            game.PublisherId = product.PublisherId;

            if (product.GenreIds != null && product.GenreIds.Count > 0)
            {
                _productService.UpdateProductGenres(game, product.GenreIds);
            }

            if (product.Images != null && product.Images.Count() > 0)
            {
                _imageService.UpdateImages(product.Images, game, "game");
            }
            else
            {
                var images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == game.Id).ToList();

                foreach (var image in images)
                {
                    _imageService.RemoveImage(image);
                }

                _unitOfWork.ProductImage.RemoveRange(images);
                _unitOfWork.Save();
            }

            _unitOfWork.ProductGame.Update(game);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Ändringarna har sparats!" });
        }
    }
}
