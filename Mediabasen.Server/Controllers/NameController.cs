using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NameController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public NameController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public IActionResult AddName(Name name)
        {
            if (!ModelState.IsValid) return new JsonResult(new { message = "Invalid name!" });

            _unitOfWork.Name.Add(name);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Name added!" });
        }
    }
}
