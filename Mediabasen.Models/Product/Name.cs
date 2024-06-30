using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.Product
{
    public class Name
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Fullname { get; set; }
    }
}
