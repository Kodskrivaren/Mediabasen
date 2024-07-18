using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product.Game;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductGameRepository : Repository<ProductGame>, IProductGameRepository
    {
        private ApplicationDbContext _db;
        public ProductGameRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductGame product)
        {
            _db.ProductGames.Update(product);
        }
    }
}
