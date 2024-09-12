using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Cart
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public List<CartProduct> CartProducts { get; set; }
        public string? UserId { get; set; }
        [Required]
        public DateTime Expires { get; set; }
        [NotMapped]
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
