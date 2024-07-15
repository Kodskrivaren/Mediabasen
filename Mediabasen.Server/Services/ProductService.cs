using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Movie;
using Mediabasen.Models.Product.Music;

namespace Mediabasen.Server.Services
{
    public class ProductService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private List<ProductImage> GetProductImages(Product product)
        {
            List<ProductImage> Images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id).ToList();
            foreach (var image in Images)
            {
                image.Product = null;
            }

            return Images;
        }

        public void SetBasicProperties(Product product, ProductType productType)
        {
            product.Images = GetProductImages(product);

            product.ProductType = productType;

            product.Format = _unitOfWork.Format.GetFirstOrDefault(u => u.Id == product.FormatId);

            var productGenres = _unitOfWork.ProductGenre.GetAll(u => u.ProductId == product.Id).ToList();

            product.Genres = _unitOfWork.Genre.GetAll().Where(genre => productGenres.Find(productGenre => productGenre.GenreId == genre.Id) != null).ToList();

            if (product.Discount > 0)
            {
                product.DiscountedPrice = GetCalculatedDiscountedPrice(product);
            }
        }

        public decimal GetCalculatedDiscountedPrice(Product product)
        {
            return Math.Round(product.Price - ((product.Discount / 100) * product.Price));
        }

        public ProductMovie GetProductMovie(Product product)
        {
            var movie = _unitOfWork.ProductMovie.GetFirstOrDefault(u => u.Id == product.Id);

            SetBasicProperties(movie, product.ProductType);

            movie.Director = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == movie.DirectorNameId);

            var movieActorIds = _unitOfWork.MovieActor.GetAll(u => u.ProductMovieId == movie.Id).ToList();

            movie.Actors = _unitOfWork.Name.GetAll().Where(name => movieActorIds.Find(movieActor => name.Id == movieActor.NameId) != null).ToList();

            return movie;
        }

        public ProductMusic GetProductMusic(Product product)
        {
            var music = _unitOfWork.ProductMusic.GetFirstOrDefault(u => u.Id == product.Id);

            SetBasicProperties(music, product.ProductType);

            music.Artist = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.ArtistId);

            music.Label = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.LabelId);

            music.Publisher = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.PublisherId);

            return music;
        }
    }
}
