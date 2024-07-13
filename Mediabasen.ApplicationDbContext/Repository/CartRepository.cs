using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;

namespace Mediabasen.DataAccess.Repository
{
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        private ApplicationDbContext _db;
        public CartRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Cart cart)
        {
            _db.Carts.Update(cart);
        }
    }
}
