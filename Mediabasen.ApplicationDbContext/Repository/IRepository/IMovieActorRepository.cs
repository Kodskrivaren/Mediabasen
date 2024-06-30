using Mediabasen.Models.Product.Movie;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IMovieActorRepository : IRepository<MovieActor>
    {
        public void Update(MovieActor movieActors);
    }
}
