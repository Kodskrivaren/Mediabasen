using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductGenreRepository : Repository<ProductGenre>, IProductGenreRepository
    {
        private ApplicationDbContext _db;
        public ProductGenreRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductGenre productGenres)
        {
            _db.ProductGenres.Update(productGenres);
        }
    }
}
