using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product.Book;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductBookRepository : Repository<ProductBook>, IProductBookRepository
    {
        private ApplicationDbContext _db;
        public ProductBookRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductBook product)
        {
            _db.ProductBooks.Update(product);
        }
    }
}
