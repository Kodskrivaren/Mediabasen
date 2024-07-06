using Mediabasen.Models;
using Mediabasen.Models.ControllerModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [ActionName("Login")]
        public IActionResult Login(Credentials credentials)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Email == credentials.Email);

            if (user == null) { return NotFound(); }

            var result = _signInManager.PasswordSignInAsync(user, credentials.Password, true, false).GetAwaiter().GetResult();

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
