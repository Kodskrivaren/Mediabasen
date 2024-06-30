using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult Products()
        {
            List<Product> products = _unitOfWork.Product.GetAll().ToList();
            JsonResult res = new JsonResult(new { products });
            return res;
        }
    }
}
