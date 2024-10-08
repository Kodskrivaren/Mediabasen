﻿namespace Mediabasen.DataAccess.Repository.IRepository
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
        public ICartRepository Cart { get; }
        public IOrderRepository Order { get; }
        public IProductMusicRepository ProductMusic { get; }
        public IProductBookRepository ProductBook { get; }
        public IProductGameRepository ProductGame { get; }
        void Save();
    }
}
