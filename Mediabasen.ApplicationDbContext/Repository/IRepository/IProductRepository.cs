using Mediabasen.Models;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        public void Update(Product product);
    }
}
