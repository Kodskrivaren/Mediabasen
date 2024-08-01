using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.Product;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

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

        public bool AttemptTakeFromStock(Cart cart)
        {
            try
            {
                var affectedRows = _db.Database.ExecuteSql(GetFormattedStockQuery(cart.CartProducts));

                return affectedRows == cart.CartProducts.Count;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);

                return false;
            }
        }

        private FormattableString GetFormattedStockQuery(List<CartProduct> cartProducts)
        {
            string start = $"UPDATE products SET stockquantity = case ";

            string acc = $"";

            List<string> productIds = new List<string>();

            foreach (var item in cartProducts)
            {
                acc = acc + $"when id = {item.ProductId} then stockquantity - {item.Count} ";
                productIds.Add(item.ProductId.ToString());
            }

            string end = $"end where id in ({string.Join(",", productIds)});";

            return FormattableStringFactory.Create(start + acc + end);
        }

        public IEnumerable<Product> GetNewestProducts()
        {
            return _db.Products.OrderByDescending(u => u.AddedToStoreDate).Take(10);
        }

        public IEnumerable<Product> SearchProducts(string query)
        {
            return _db.Products
                .Where((u) => u.Name.Contains(query))
                .Take(10);
        }

        public IEnumerable<Product> FullSearchProducts(string? query, int? productTypeId, int? page)
        {
            int itemsPerPage = 5;

            IQueryable<Product> products = _db.Products;

            if (productTypeId != null && productTypeId > 0)
            {
                products = products.Where((u) => u.ProductTypeId == productTypeId);
            }

            if (query != null && query != "")
            {
                products = products.Where((u) => u.Name.Contains(query));
            }

            if (page != null && page > 1)
            {
                products = products.Skip((int.Parse(page.ToString()) - 1) * itemsPerPage);
            }

            products = products.Take(itemsPerPage);

            return products;
        }
    }
}
