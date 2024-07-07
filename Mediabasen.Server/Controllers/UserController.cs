using Mediabasen.Models;
using Mediabasen.Models.ControllerModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [ActionName("UserDetails")]
        [Authorize]
        public IActionResult UserDetails()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return BadRequest(); }

            string id = idClaim.ToString().Split(" ")[1];

            var user = _userManager.Users.FirstOrDefault(u => u.Id == id);

            if (user == null) { return BadRequest(); }

            var roles = _userManager.GetRolesAsync(user).GetAwaiter().GetResult();

            return new JsonResult(new
            {
                name = user.Name,
                adress = user.Adress,
                email = user.Email,
                city = user.City,
                phoneNumber = user.PhoneNumber,
                postalCode = user.PostalCode,
                roles
            });
        }

        [HttpPost]
        [ActionName("CreateUser")]
        public IActionResult CreateUser(NewAccount newAccount)
        {
            if (!ModelState.IsValid)
            {
                HttpContext.Response.StatusCode = 400;
                return new JsonResult(new { ModelState.ValidationState });
            }

            ApplicationUser newUser = new ApplicationUser()
            {
                Name = newAccount.Name,
                Email = newAccount.Email,
                Adress = newAccount.Adress,
                PostalCode = newAccount.PostalCode,
                City = newAccount.City,
                UserName = newAccount.Email,
                PhoneNumber = newAccount.PhoneNumber,
            };

            IdentityResult result = _userManager.CreateAsync(newUser, newAccount.Password).GetAwaiter().GetResult();

            if (!result.Succeeded)
            {
                HttpContext.Response.StatusCode = 400;
                return new JsonResult(new { result.Errors });
            }

            return Ok();
        }
    }
}
