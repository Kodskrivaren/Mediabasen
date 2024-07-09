using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IGenreRepository : IRepository<Genre>
    {
        public void Update(Genre genres);
    }
}
