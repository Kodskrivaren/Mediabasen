using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        [NotMapped]
        public List<ProductImage> Images { get; set; }
        [NotMapped]
        public List<Genre> Genres { get; set; } = new List<Genre>();
        public int FormatId { get; set; }
        [ForeignKey("FormatId")]
        [NotMapped]
        public Format Format { get; set; }
        public int ProductTypeId { get; set; }
        [ForeignKey("ProductTypeId")]
        [NotMapped]
        public ProductType ProductType { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime AddedToStoreDate { get; set; }
        [NotMapped]
        public decimal? DiscountedPrice { get; set; }
        public List<ProductReview>? Reviews { get; set; }
    }
}
