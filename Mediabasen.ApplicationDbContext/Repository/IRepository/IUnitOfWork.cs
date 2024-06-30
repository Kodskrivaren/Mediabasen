namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IProductRepository Product { get; }
        public IProductMovieRepository ProductMovie { get; }
        public INameRepository Name { get; }
        void Save();
    }
}
