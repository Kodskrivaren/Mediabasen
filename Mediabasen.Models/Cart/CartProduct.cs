using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Cart
{
    public class CartProduct
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int CartId { get; set; }
        [NotMapped]
        [ForeignKey("CartId")]
        public Cart Cart { get; set; }
        [Required]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        [NotMapped]
        public Product.Product Product { get; set; }
        public int Count { get; set; }
    }
}
