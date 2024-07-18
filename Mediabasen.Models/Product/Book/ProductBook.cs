using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product.Book
{
    public class ProductBook : Product
    {
        public int AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        [NotMapped]
        public Name Author { get; set; }
        public int PublisherId { get; set; }
        [ForeignKey("PublisherId")]
        [NotMapped]
        public Name Publisher { get; set; }
    }
}
