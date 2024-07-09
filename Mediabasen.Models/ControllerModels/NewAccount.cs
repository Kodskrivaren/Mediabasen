using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.ControllerModels
{
    public class NewAccount
    {
        [Required(AllowEmptyStrings = false)]
        public string Name { get; set; }
        [Required(AllowEmptyStrings = false)]
        [EmailAddress]
        public string Email { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Password { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string Adress { get; set; }
        [Required(AllowEmptyStrings = false)]
        public int PostalCode { get; set; }
        [Required(AllowEmptyStrings = false)]
        public string City { get; set; }
        [Required(AllowEmptyStrings = false)]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}
