using Mediabasen.Models.Cart;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        public void Update(Product product);
        public IEnumerable<Product> GetNewestProducts();
        public IEnumerable<Product> SearchProducts(string query);
        public SearchResult FullSearchProducts(string? query, int? productTypeId, int? page);
        public bool AttemptTakeFromStock(Cart cart);
        public IEnumerable<Genre> GetGenresForProductType(int productTypeId);
    }
}
