namespace Mediabasen.Models.ControllerModels
{
    public class GamePost : ProductPost
    {
        public int DeveloperId { get; set; }
        public int PublisherId { get; set; }
    }
}
