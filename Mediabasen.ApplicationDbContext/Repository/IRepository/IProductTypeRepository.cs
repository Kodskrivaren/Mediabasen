using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductTypeRepository : IRepository<ProductType>
    {
        public void Update(ProductType productTypes);
    }
}
