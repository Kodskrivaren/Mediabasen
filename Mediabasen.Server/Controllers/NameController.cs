using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NameController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public NameController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [ActionName("FindName")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult FindName(string query)
        {
            var foundNames = _unitOfWork.Name.GetAll(u => u.Fullname.ToLower().StartsWith(query.ToLower())).ToList();

            return new JsonResult(foundNames);
        }

        [HttpPost]
        [ActionName("AddName")]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddName(Name name)
        {
            if (!ModelState.IsValid) return new JsonResult(new { message = "Invalid name!" });

            _unitOfWork.Name.Add(name);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Name added!", name });
        }
    }
}
