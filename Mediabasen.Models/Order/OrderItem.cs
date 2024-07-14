using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Order
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public int Amount { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        [NotMapped]
        public Product.Product Product { get; set; }
    }
}
