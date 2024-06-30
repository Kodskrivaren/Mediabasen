using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product.Movie
{
    public class MovieActor
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int ProductMovieId { get; set; }
        [ForeignKey("ProductMovieId")]
        public ProductMovie Movie { get; set; }
        [Required]
        public int NameId { get; set; }
        [ForeignKey("NameId")]
        public Name Actor { get; set; }
    }
}
