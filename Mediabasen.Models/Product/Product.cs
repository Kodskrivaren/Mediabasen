using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.Product
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
    }
}
