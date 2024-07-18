using Mediabasen.Models.Product.Game;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductGameRepository : IRepository<ProductGame>
    {
        public void Update(ProductGame productGames);
    }
}
