using Mediabasen.Models.Cart;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        public void Update(Product product);
        public IEnumerable<Product> GetNewestProducts();
        public IEnumerable<Product> SearchProducts(string query);
        public SearchResult FullSearchProducts(string? query, int? productTypeId, int? page, int? genreId);
        public bool AttemptTakeFromStock(Cart cart);
        public IEnumerable<Product> ProductsOnSale();
        public IEnumerable<Genre> GetGenresForProductType(int productTypeId);
        public void RemoveUserReviews(string userId);
    }
}
