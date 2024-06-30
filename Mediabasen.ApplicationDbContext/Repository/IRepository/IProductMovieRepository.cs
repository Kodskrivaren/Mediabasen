using Mediabasen.Models.Product.Movie;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductMovieRepository : IRepository<ProductMovie>
    {
        public void Update(ProductMovie productMovie);
    }
}
