using Mediabasen.Models;
using Microsoft.AspNetCore.Identity;

namespace Mediabasen.Server.Services
{
    public class UserService
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserService(SignInManager<ApplicationUser> signInManager) 
        { 
            _signInManager = signInManager; 
        }

        public string GetUserEmailById(string userId)
        {
            var user = _signInManager.UserManager.FindByIdAsync(userId).GetAwaiter().GetResult();

            if (user == null) { return ""; }

            return user.Email;
        }

        public string GetUserId(HttpContext httpContext)
        {
            var idClaim = httpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return ""; }

            return idClaim.ToString().Split(" ")[1];
        }
    }
}
