namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IProductRepository Product { get; }
        public IProductMovieRepository ProductMovie { get; }
        public IProductImageRepository ProductImage { get; }
        public IMovieActorRepository MovieActor { get; }
        public INameRepository Name { get; }
        void Save();
    }
}
