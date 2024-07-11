using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.Product
{
    public class Format
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }
    }
}
