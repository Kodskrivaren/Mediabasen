using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductGenreRepository : IRepository<ProductGenre>
    {
        public void Update(ProductGenre productGenres);
    }
}
