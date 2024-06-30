using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product.Movie;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductMovieRepository : Repository<ProductMovie>, IProductMovieRepository
    {
        private ApplicationDbContext _db;
        public ProductMovieRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductMovie product)
        {
            _db.ProductMovies.Update(product);
        }
    }
}
