using Microsoft.AspNetCore.Http;

namespace Mediabasen.Models.ControllerModels
{
    public class MusicPost
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public int ArtistId { get; set; }
        public int FormatId { get; set; }
        public int LabelId { get; set; }
        public int PublisherId { get; set; }
        public List<int>? GenreIds { get; set; }
        public IEnumerable<IFormFile>? Images { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}
