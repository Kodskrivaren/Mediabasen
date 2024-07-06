using Mediabasen.DataAccess.Repository.IRepository;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [ActionName("CreateAccount")]
        public IActionResult CreateAccount(NewAccount newAccount)
        {
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

            return Ok();
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
