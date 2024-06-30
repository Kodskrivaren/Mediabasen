using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;

namespace Mediabasen.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        ApplicationDbContext _db;
        public IProductRepository Product { get; private set; }
        public IProductMovieRepository ProductMovie { get; private set; }
        public INameRepository Name { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Product = new ProductRepository(_db);
            ProductMovie = new ProductMovieRepository(_db);
            Name = new NameRepository(_db);
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
