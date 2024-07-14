using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product.Music
{
    public class ProductMusic : Product
    {
        public int ArtistId { get; set; }
        [ForeignKey("ArtistId")]
        [NotMapped]
        public Name Artist { get; set; }
        public int LabelId { get; set; }
        [ForeignKey("LabelId")]
        [NotMapped]
        public Name Label { get; set; }
        public int PublisherId { get; set; }
        [ForeignKey("PublisherId")]
        [NotMapped]
        public Name Publisher { get; set; }
    }
}
