using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product.Movie;

namespace Mediabasen.DataAccess.Repository
{
    public class MovieActorRepository : Repository<MovieActor>, IMovieActorRepository
    {
        private ApplicationDbContext _db;
        public MovieActorRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(MovieActor movieActors)
        {
            _db.MoviesActors.Update(movieActors);
        }
    }
}
