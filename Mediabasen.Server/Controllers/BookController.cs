using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.ControllerModels;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Book;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ImageService _imageService;
        public BookController(IUnitOfWork unitOfWork, ImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
        }

        [HttpPost]
        [ActionName("AddBook")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddBook(BookPost book)
        {
            if (!ModelState.IsValid) return new JsonResult(new { Message = "Invalid data!" });

            var productType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Book);

            var newBook = new ProductBook()
            {
                Name = book.Name,
                Description = book.Description,
                Price = book.Price,
                Discount = book.Discount,
                FormatId = book.FormatId,
                ProductTypeId = productType.Id,
                ReleaseDate = book.ReleaseDate,
                AddedToStoreDate = DateTime.Now,
                PublisherId = book.PublisherId,
                AuthorId = book.AuthorId,
            };

            _unitOfWork.ProductBook.Add(newBook);
            _unitOfWork.Save();

            if (book.GenreIds != null && book.GenreIds.Count() > 0)
            {
                foreach (int genreId in book.GenreIds)
                {
                    _unitOfWork.ProductGenre.Add(
                        new ProductGenre()
                        {
                            ProductId = newBook.Id,
                            GenreId = genreId
                        });
                }
                _unitOfWork.Save();
            }

            if (book.Images != null && book.Images.Count() > 0)
            {
                _imageService.SaveImages(book.Images, newBook, "book");
            }

            return new JsonResult(new { message = "Boken har lagts till!" });
        }
    }
}
