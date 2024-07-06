using Mediabasen.Models;
using Mediabasen.Models.ControllerModels;
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

        [HttpPost]
        [ActionName("CreateUser")]
        public IActionResult CreateUser(NewAccount newAccount)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new { ModelState.ValidationState });
            }
            ApplicationUser newUser = new ApplicationUser()
            {
                Name = newAccount.Name,
                Email = newAccount.Email,
                Adress = newAccount.Adress,
                PostalCode = newAccount.PostalCode,
                City = newAccount.City,
                UserName = newAccount.Email
            };

            IdentityResult result = _userManager.CreateAsync(newUser, newAccount.Password).GetAwaiter().GetResult();

            Console.WriteLine(result.Succeeded);
            if (!result.Succeeded)
            {
                return new JsonResult(new { result.Errors });
            }

            return Ok();
        }
    }
}
