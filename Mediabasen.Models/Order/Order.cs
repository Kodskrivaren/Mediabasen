using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Order
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [NotMapped]
        public ApplicationUser User { get; set; }
        public DateTime OrderPlaced { get; set; }
        public DateTime? OrderShipped { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
