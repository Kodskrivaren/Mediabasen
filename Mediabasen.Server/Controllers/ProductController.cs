using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
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
    }
}
