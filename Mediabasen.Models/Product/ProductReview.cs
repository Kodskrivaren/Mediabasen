using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product
{
    public class ProductReview
    {
        [Key]
        public int Id { get; set; }
        [Range(0, 5)]
        public decimal Rating { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [NotMapped]
        public ApplicationUser User { get; set; }
        public string Content { get; set; }
        [NotMapped]
        public string Username { get; set; }
    }
}
