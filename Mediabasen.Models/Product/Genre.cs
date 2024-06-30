using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.Product
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
