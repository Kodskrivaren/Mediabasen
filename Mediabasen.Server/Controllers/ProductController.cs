using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
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
                product.Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id).ToList();
                foreach (var image in product.Images)
                {
                    image.Product = null;
                }
            }
            JsonResult res = new JsonResult(new { products });
            return res;
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
