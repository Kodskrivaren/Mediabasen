using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product.Game
{
    public class ProductGame : Product
    {
        public int DeveloperId { get; set; }
        [NotMapped]
        [ForeignKey("DeveloperId")]
        public Name Developer { get; set; }
        public int PublisherId { get; set; }
        [NotMapped]
        [ForeignKey("PublisherId")]
        public Name Publisher { get; set; }
    }
}
