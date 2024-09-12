using Mediabasen.Models.ControllerModels;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Order
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; }
        public string? UserId { get; set; }
        public PlaceOrderPost? GuestDetails { get; set; }
        [ForeignKey("UserId")]
        [NotMapped]
        public ApplicationUser User { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderPlaced { get; set; }
        public DateTime? OrderShipped { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
