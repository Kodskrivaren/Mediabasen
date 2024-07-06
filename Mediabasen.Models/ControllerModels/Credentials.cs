using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.ControllerModels
{
    public class Credentials
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
