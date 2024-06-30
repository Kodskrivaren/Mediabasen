using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Adress { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string City { get; set; }

    }
}
