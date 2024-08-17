using Mediabasen.DataAccess.Repository.IRepository;
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
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUnitOfWork _unitOfWork;

        [ActivatorUtilitiesConstructor]
        public UserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _unitOfWork = unitOfWork;
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

        [HttpDelete]
        [Authorize]
        public IActionResult DeleteUser()
        {
            var idClaim = HttpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return BadRequest(); }

            string id = idClaim.ToString().Split(" ")[1];

            var cart = _unitOfWork.Cart.GetFirstOrDefault(u => u.UserId == id);

            if (cart != null)
            {
                _unitOfWork.Cart.Remove(cart);
                _unitOfWork.Save();
            }

            var orders = _unitOfWork.Order.GetAll(u => u.UserId == id);

            foreach (var order in orders)
            {
                _unitOfWork.Order.Remove(order);
                _unitOfWork.Save();
            }

            _unitOfWork.Product.RemoveUserReviews(id);

            var user = _userManager.GetUserAsync(HttpContext.User).GetAwaiter().GetResult();

            if (user != null)
            {
                _signInManager.SignOutAsync().GetAwaiter().GetResult();

                var result = _userManager.DeleteAsync(user).GetAwaiter().GetResult();

                if (result.Succeeded)
                {
                    return new JsonResult(new { Message = "Kontot har tagits bort!" });
                }
            }

            HttpContext.Response.StatusCode = 500;

            return new JsonResult(new { Message = "Något gick fel!" });
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
                PostalCode = newAccount.PostalCode.ToString(),
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

            _signInManager.SignInAsync(newUser, true).GetAwaiter().GetResult();

            return new JsonResult(new
            {
                name = newAccount.Name,
                adress = newAccount.Adress,
                email = newAccount.Email,
                city = newAccount.City,
                phoneNumber = newAccount.PhoneNumber,
                postalCode = newAccount.PostalCode,
                roles = new string[] { }
            });
        }
    }
}
