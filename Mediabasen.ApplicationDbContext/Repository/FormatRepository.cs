using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository
{
    public class FormatRepository : Repository<Format>, IFormatRepository
    {
        private ApplicationDbContext _db;
        public FormatRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Format format)
        {
            _db.Formats.Update(format);
        }
    }
}
