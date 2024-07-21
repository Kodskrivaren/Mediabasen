namespace Mediabasen.Server.Services
{
    public class UserService
    {
        public string GetUserId(HttpContext httpContext)
        {
            var idClaim = httpContext.User.Claims.FirstOrDefault(u => u.ToString().Contains("nameidentifier"));

            if (idClaim == null) { return ""; }

            return idClaim.ToString().Split(" ")[1];
        }
    }
}
