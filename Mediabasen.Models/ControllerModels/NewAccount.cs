using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.ControllerModels
{
    public class NewAccount
    {
        public string Name { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Adress { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
    }
}
