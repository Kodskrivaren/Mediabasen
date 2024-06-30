using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Product product)
        {
            _db.Products.Update(product);
        }
    }
}
