using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public List<CartProduct> CartProducts { get; set; }
        [Required]
        public string UserId { get; set; }
        [NotMapped]
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
    }
}
