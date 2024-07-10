using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public GenreController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult FindGenres(string search)
        {
            var result = _unitOfWork.Genre.GetAll(u => u.Name.ToLower().StartsWith(search.ToLower())).ToList();

            return new JsonResult(result);
        }

        [HttpPost]
        [Authorize(Roles = SD.Role_Admin)]
        public IActionResult AddGenre(Genre genre)
        {
            if (!ModelState.IsValid) { return BadRequest(); }

            _unitOfWork.Genre.Add(genre);
            _unitOfWork.Save();

            return new JsonResult(new { message = "Genren lades till!", data = genre });
        }
    }
}
