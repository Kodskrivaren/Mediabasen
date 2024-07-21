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
        private readonly ProductService _productService;

        [ActivatorUtilitiesConstructor]
        public BookController(IUnitOfWork unitOfWork, ImageService imageService, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _imageService = imageService;
            _productService = productService;
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

        [HttpPatch]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult UpdateBook(BookPost product)
        {
            var book = _unitOfWork.ProductBook.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            if (book == null) return NotFound();

            book.Name = product.Name;
            book.Description = product.Description;
            book.Price = product.Price;
            book.Discount = product.Discount;
            book.ReleaseDate = product.ReleaseDate;
            book.FormatId = product.FormatId;

            book.AuthorId = product.AuthorId;
            book.PublisherId = product.PublisherId;

            if (product.GenreIds != null && product.GenreIds.Count > 0)
            {
                _productService.UpdateProductGenres(book, product.GenreIds);
            }

            if (product.Images != null && product.Images.Count() > 0)
            {
                _imageService.UpdateImages(product.Images, book, "book");
            }
            else
            {
                var images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == book.Id).ToList();

                foreach (var image in images)
                {
                    _imageService.RemoveImage(image);
                }

                _unitOfWork.ProductImage.RemoveRange(images);
                _unitOfWork.Save();
            }

            _unitOfWork.ProductBook.Update(book);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Ändringarna har sparats!" });
        }
    }
}
