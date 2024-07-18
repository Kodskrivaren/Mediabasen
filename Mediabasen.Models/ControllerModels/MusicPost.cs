namespace Mediabasen.Models.ControllerModels
{
    public class MusicPost : ProductPost
    {
        public int ArtistId { get; set; }
        public int LabelId { get; set; }
        public int PublisherId { get; set; }
    }
}
