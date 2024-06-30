using System.ComponentModel.DataAnnotations.Schema;

namespace Mediabasen.Models.Product.Movie
{
    public class ProductMovie : Product
    {
        public int DirectorNameId { get; set; }
        [ForeignKey("DirectorNameId")]
        [NotMapped]
        public Name Director { get; set; }
        [NotMapped]
        List<Name> Actors { get; set; } = new List<Name>();
    }
}
