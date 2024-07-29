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
            return _db.Products
                .AsEnumerable()
                .Where((u) => u.Name.ToLower().Contains(query.ToLower()))
                .Where((u, index) => index < 10);
        }

        public IEnumerable<Product> FullSearchProducts(string? query, int[]? filter, int? page)
        {
            int itemsPerPage = 5;

            return _db.Products
                        .ToList()
                        .Where((u) => MatchesFilter(filter, u) && MatchesQuery(query, u))
                        .Where((u, index) => IsInPage(page, index, itemsPerPage)
                        );
        }

        private bool MatchesFilter(int[]? filter, Product u)
        {
            return filter != null && filter.Length != 0 ? filter.Contains(u.ProductTypeId) : true;
        }

        private bool MatchesQuery(string? query, Product u)
        {
            return query != null && query != "" ?
                    u.Name.Trim().ToLower().Contains(query.ToLower()) :
                    true;
        }

        private bool IsInPage(int? page, int index, int itemsPerPage)
        {
            return page != null && page > 1 ?
                            index >= ((page - 1) * itemsPerPage) && index < page * itemsPerPage :
                            index < itemsPerPage;
        }
    }
}
