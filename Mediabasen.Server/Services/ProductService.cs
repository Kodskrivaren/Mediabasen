﻿using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Book;
using Mediabasen.Models.Product.Game;
using Mediabasen.Models.Product.Movie;
using Mediabasen.Models.Product.Music;
using Microsoft.AspNetCore.Identity;

namespace Mediabasen.Server.Services
{
    public class ProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProductService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
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

        public void UpdateProductGenres(Product product, List<int> newGenreIds)
        {
            var productGenres = _unitOfWork.ProductGenre.GetAll(u => u.ProductId == product.Id).ToList();

            List<ProductGenre> productGenresToAdd = new List<ProductGenre>();
            List<ProductGenre> searchedGenres = new List<ProductGenre>();

            foreach (var genreId in newGenreIds)
            {
                var foundGenre = productGenres.Find(u => u.GenreId == genreId);

                if (foundGenre == null)
                {
                    productGenresToAdd.Add(new ProductGenre() { ProductId = product.Id, GenreId = genreId });
                }
                else
                {
                    searchedGenres.Add(foundGenre);
                }
            }

            foreach (var productGenre in productGenres)
            {
                var foundGenre = searchedGenres.Find(u => u.Id == productGenre.Id);

                if (foundGenre == null)
                {
                    _unitOfWork.ProductGenre.Remove(productGenre);
                    _unitOfWork.Save();
                }
            }

            if (productGenresToAdd.Count > 0)
            {
                foreach (var productGenre in productGenresToAdd)
                {
                    _unitOfWork.ProductGenre.Add(productGenre);
                    _unitOfWork.Save();
                }
            }
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

            if (product.Reviews != null && product.Reviews.Count > 0)
            {
                foreach (var review in product.Reviews)
                {
                    review.Username = _userManager.FindByIdAsync(review.UserId).GetAwaiter().GetResult().Name;
                }
            }
        }

        public decimal GetCalculatedDiscountedPrice(Product product)
        {
            return Math.Round(product.Price - ((product.Discount / 100) * product.Price));
        }

        public ProductMovie GetProductMovie(Product product)
        {
            var movie = _unitOfWork.ProductMovie.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            SetBasicProperties(movie, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == movie.ProductTypeId));

            movie.Director = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == movie.DirectorNameId);

            var movieActorIds = _unitOfWork.MovieActor.GetAll(u => u.ProductMovieId == movie.Id).ToList();

            movie.Actors = _unitOfWork.Name.GetAll().Where(name => movieActorIds.Find(movieActor => name.Id == movieActor.NameId) != null).ToList();

            return movie;
        }

        public ProductMusic GetProductMusic(Product product)
        {
            var music = _unitOfWork.ProductMusic.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            SetBasicProperties(music, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == music.ProductTypeId));

            music.Artist = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.ArtistId);

            music.Label = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.LabelId);

            music.Publisher = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == music.PublisherId);

            return music;
        }

        public ProductGame GetProductGame(Product product)
        {
            var game = _unitOfWork.ProductGame.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            SetBasicProperties(game, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == game.ProductTypeId));

            game.Publisher = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == game.PublisherId);

            game.Developer = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == game.DeveloperId);

            return game;
        }

        public ProductBook GetProductBook(Product product)
        {
            var book = _unitOfWork.ProductBook.GetFirstOrDefault(u => u.Id == product.Id, includeProperties: "Reviews");

            SetBasicProperties(book, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == book.ProductTypeId));

            book.Publisher = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == book.PublisherId);

            book.Author = _unitOfWork.Name.GetFirstOrDefault(u => u.Id == book.AuthorId);

            return book;
        }
    }
}
