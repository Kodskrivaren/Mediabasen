using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        public void Update(Product product);
        public IEnumerable<Product> GetNewestProducts();
        public IEnumerable<Product> SearchProducts(string query);
        public IEnumerable<Product> FullSearchProducts(string? query, int? productTypeId, int? page);
    }
}
