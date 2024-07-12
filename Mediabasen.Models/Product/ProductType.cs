using System.ComponentModel.DataAnnotations;

namespace Mediabasen.Models.Product
{
    public class ProductType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
