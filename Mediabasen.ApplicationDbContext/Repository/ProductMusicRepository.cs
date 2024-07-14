using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product.Music;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductMusicRepository : Repository<ProductMusic>, IProductMusicRepository
    {
        private ApplicationDbContext _db;
        public ProductMusicRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductMusic product)
        {
            _db.ProductMusic.Update(product);
        }
    }
}
