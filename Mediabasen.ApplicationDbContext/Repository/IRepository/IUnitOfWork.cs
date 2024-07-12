namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IProductRepository Product { get; }
        public IProductMovieRepository ProductMovie { get; }
        public IProductImageRepository ProductImage { get; }
        public IMovieActorRepository MovieActor { get; }
        public INameRepository Name { get; }
        public IGenreRepository Genre { get; }
        public IProductGenreRepository ProductGenre { get; }
        public IFormatRepository Format { get; }
        public IProductTypeRepository ProductType { get; }
        void Save();
    }
}
