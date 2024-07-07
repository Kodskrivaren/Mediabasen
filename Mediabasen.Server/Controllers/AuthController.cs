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
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [ActionName("Login")]
        public IActionResult Login(Credentials credentials)
        {
            var user = _userManager.Users.FirstOrDefault(x => x.Email == credentials.Email);

            if (user == null)
            {
                HttpContext.Response.StatusCode = 400;
                return new JsonResult(new { message = "Fel användarnamn eller lösenord!" });
            }

            var result = _signInManager.PasswordSignInAsync(user, credentials.Password, true, false).GetAwaiter().GetResult();

            if (result.Succeeded)
            {
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

            HttpContext.Response.StatusCode = 400;
            return new JsonResult(new { message = "Fel användarnamn eller lösenord!" });
        }
    }
}
