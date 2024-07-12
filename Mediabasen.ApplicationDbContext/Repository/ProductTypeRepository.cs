using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository
{
    public class ProductTypeRepository : Repository<ProductType>, IProductTypeRepository
    {
        private ApplicationDbContext _db;
        public ProductTypeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(ProductType productType)
        {
            _db.ProductTypes.Update(productType);
        }
    }
}
