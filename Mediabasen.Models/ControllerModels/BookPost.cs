namespace Mediabasen.Models.ControllerModels
{
    public class BookPost : ProductPost
    {
        public int AuthorId { get; set; }
        public int PublisherId { get; set; }
    }
}
