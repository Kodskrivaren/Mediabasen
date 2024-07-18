namespace Mediabasen.Models.ControllerModels
{
    public class MoviePost : ProductPost
    {
        public int DirectorId { get; set; }
        public List<int>? ActorIds { get; set; }
    }
}
