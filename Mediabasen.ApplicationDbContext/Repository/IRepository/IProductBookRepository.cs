using Mediabasen.Models.Product.Book;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductBookRepository : IRepository<ProductBook>
    {
        public void Update(ProductBook productBooks);
    }
}
