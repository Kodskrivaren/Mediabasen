using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FormatController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public FormatController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult FindFormats(string search)
        {
            var result = _unitOfWork.Format.GetAll(u => u.Name.ToLower().StartsWith(search.ToLower())).ToList();

            return new JsonResult(result);
        }

        [HttpPost]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddFormat(Format format)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            _unitOfWork.Format.Add(format);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Formatet lades till!", data = format });
        }
    }
}
