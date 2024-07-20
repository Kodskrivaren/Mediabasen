using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

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

        public IEnumerable<Product> GetNewestProducts()
        {
            return _db.Products.AsEnumerable().OrderByDescending(u => u.AddedToStoreDate).Where((u, index) => index < 10);
        }

        public IEnumerable<Product> SearchProducts(string query)
        {
            return _db.Products.AsEnumerable().Where((u, index) => index < 10 && u.Name.ToLower().StartsWith(query.ToLower()));
        }
    }
}
