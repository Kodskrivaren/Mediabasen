using Mediabasen.Models;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface ICartRepository : IRepository<Cart>
    {
        public void Update(Cart carts);
    }
}
