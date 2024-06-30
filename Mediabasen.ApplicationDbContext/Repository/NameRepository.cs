using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository
{
    public class NameRepository : Repository<Name>, INameRepository
    {
        private ApplicationDbContext _db;
        public NameRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Name product)
        {
            _db.Names.Update(product);
        }
    }
}
