using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;
using Mediabasen.Models.Product;
using Mediabasen.Utility.SD;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
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

        public void RemoveUserReviews(string userId)
        {
            var userIdParameter = new MySqlParameter("@userId", MySqlDbType.VarChar);

            userIdParameter.Value = userId;

            _db.Database.ExecuteSqlRaw("DELETE FROM productreview WHERE UserId = @userId", userIdParameter);
        }

        public bool AttemptTakeFromStock(Cart cart)
        {
            try
            {
                var affectedRows = _db.Database.ExecuteSql(GetFormattedStockQuery(cart.CartProducts));
                Console.WriteLine(affectedRows);
                Console.WriteLine(cart.CartProducts.Count);
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

        public IEnumerable<Product> ProductsOnSale()
        {
            return _db.Products
                .Where((u) => u.Discount > 0)
                .Take(10);
        }

        private int CalculateSkips(int? page, int itemsPerPage)
        {
            if (page != null && page > 1)
            {
                return (int.Parse(page.ToString()) - 1) * itemsPerPage;
            }

            return 0;
        }

        public IEnumerable<Genre> GetGenresForProductType(int productTypeId)
        {
            var genres = _db.Genres.FromSql($"SELECT DISTINCT g.* FROM Genres g INNER JOIN ProductGenres pg INNER JOIN Products p ON pg.ProductId = p.Id AND pg.GenreId = g.Id WHERE p.ProductTypeId = {productTypeId};");

            return genres;
        }

        public SearchResult FullSearchProducts(string? query, int? productTypeId, int? page, int? genreId)
        {
            int totalHits = 0;
            IQueryable<Product> products;

            List<FormattableString> conditions = new List<FormattableString>();

            var queryParameter = new MySqlParameter("@query", MySqlDbType.VarChar);

            if (query != null)
            {
                queryParameter.Value = $"%{query}%".ToString();

                conditions.Add($"(p.Name LIKE @query OR n.Fullname LIKE @query)");
            }

            if (productTypeId != null && productTypeId > 0)
            {
                conditions.Add($"p.productTypeId = {productTypeId}");
            }

            if (genreId != null && genreId > 0)
            {
                conditions.Add($"pg.ProductId = p.Id AND pg.GenreId = {genreId}");
            }

            var conditionString = (conditions.Count > 0 ? $" WHERE " + string.Join(" AND ", conditions) : $"");

            var baseQuery = $"SELECT DISTINCT p.* FROM Products p INNER JOIN Names n ON p.ArtistId = n.Id OR p.AuthorId = n.Id OR p.DirectorNameId = n.Id OR p.DeveloperId = n.Id INNER JOIN ProductGenres pg";

            var fullQuery = FormattableStringFactory.Create(baseQuery + conditionString + $" LIMIT {CalculateSkips(page, SD.Items_Per_Search_Page)},{SD.Items_Per_Search_Page};");

            products = _db.Products.FromSqlRaw(fullQuery.ToString(), queryParameter);

            totalHits = _db.Products.FromSqlRaw(
                    FormattableStringFactory.Create(baseQuery + conditionString).ToString(), queryParameter
                ).ToList().Count;

            return new SearchResult(products, totalHits);
        }
    }
}
