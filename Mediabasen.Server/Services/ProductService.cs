using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Book;
using Mediabasen.Models.Product.Game;
using Mediabasen.Models.Product.Movie;
using Mediabasen.Models.Product.Music;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Identity;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using System.Globalization;

namespace Mediabasen.Server.Services
{
    public class ProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ImageService _imageService;

        public ProductService(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, ImageService imageService)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _imageService = imageService;
        }

        public IEnumerable<Product> GetSimilarProducts(Product product)
        {
            product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

            switch (product.ProductType.Name)
            {
                case SD.Type_Movie:
                    var movie = GetProductMovie(product);

                    var similarMovies = _unitOfWork.ProductMovie
                        .GetAll(u => u.Id != movie.Id && (u.DirectorNameId == movie.DirectorNameId))
                        .Take(SD.Items_Per_Search_Page)
                        .ToList()
                        .Select(GetProductMovie);

                    return similarMovies;
                case SD.Type_Music:
                    var music = GetProductMusic(product);

                    var similarMusic = _unitOfWork.ProductMusic
                        .GetAll(u => u.Id != music.Id && (u.ArtistId == music.ArtistId || u.PublisherId == music.PublisherId))
                        .Take(SD.Items_Per_Search_Page)
                        .ToList()
                        .Select(GetProductMusic);

                    return similarMusic;
                case SD.Type_Book:
                    var book = GetProductBook(product);
                    var similarBooks = _unitOfWork.ProductBook
                        .GetAll(u => u.Id != book.Id && (u.AuthorId == book.AuthorId))
                        .Take(SD.Items_Per_Search_Page)
                        .ToList()
                        .Select(GetProductBook);
                    return similarBooks;
                case SD.Type_Game:
                    var game = GetProductGame(product);

                    var similarGames = _unitOfWork.ProductGame
                        .GetAll(u => u.Id != game.Id && (u.DeveloperId == game.DeveloperId || game.FormatId == u.FormatId))
                        .OrderBy(u => u.DeveloperId == game.DeveloperId ? -1 : 1)
                        .Take(SD.Items_Per_Search_Page)
                        .ToList()
                        .Select(GetProductGame);

                    return similarGames;
                default:
                    return null;
            }
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

        public void TryAddProductFromExcel(ExcelWorksheet worksheet, int row)
        {
            var excelProduct = GetExcelProductFromSheet(worksheet, row);

            var foundFormat = _unitOfWork.Format.GetFirstOrDefault(u => u.Name == excelProduct.Format);

            if (foundFormat != null)
            {
                var foundProduct = _unitOfWork.Product.GetFirstOrDefault(u => u.Name == excelProduct.Title && u.FormatId == foundFormat.Id);

                if (foundProduct != null)
                {
                    Console.WriteLine($"{excelProduct.Title} already exists!");
                    return;
                }
            }
            else
            {
                Format newFormat = new Format() { Name = excelProduct.Format };

                _unitOfWork.Format.Add(newFormat);

                _unitOfWork.Save();
            }

            var cultureInfo = new CultureInfo("sv-SE");

            Product createdProduct;

            switch (excelProduct.ProductType)
            {
                case SD.Type_Game:
                    if (excelProduct.Developer == null || excelProduct.Publisher == null)
                    {
                        Console.WriteLine($"{excelProduct.Title} is missing Developer or Publisher!");
                        return;
                    }

                    createdProduct = CreateGameFromExcel(excelProduct, cultureInfo);

                    break;
                case SD.Type_Book:
                    if (excelProduct.Author == null || excelProduct.Publisher == null)
                    {
                        Console.WriteLine($"{excelProduct.Title} is missing Author or Publisher!");
                        return;
                    }

                    createdProduct = CreateBookFromExcel(excelProduct, cultureInfo);

                    break;
                case SD.Type_Music:
                    if (excelProduct.Label == null || excelProduct.Artist == null || excelProduct.Publisher == null)
                    {
                        Console.WriteLine($"{excelProduct.Title} is missing Label, Publisher or Artist!");
                        return;
                    }

                    createdProduct = CreateMusicFromExcel(excelProduct, cultureInfo);

                    break;
                case SD.Type_Movie:
                    if (excelProduct.Actors == null || excelProduct.Director == null)
                    {
                        Console.WriteLine($"{excelProduct.Title} is missing Actors or Director!");
                        return;
                    }

                    createdProduct = CreateMovieFromExcel(excelProduct, cultureInfo);

                    break;
                default:
                    Console.WriteLine($"Unkown product type on {excelProduct.Title}! product type: {excelProduct.ProductType}");
                    return;
            }

            string[] genreArray = excelProduct.Genres.Split(",");

            if (genreArray.Count() > 0)
            {
                foreach (string genre in genreArray)
                {
                    Genre foundGenre = _unitOfWork.Genre.GetFirstOrDefault(u => u.Name == genre);

                    if (foundGenre == null)
                    {
                        foundGenre = new Genre() { Name = genre };

                        _unitOfWork.Genre.Add(foundGenre);

                        _unitOfWork.Save();
                    }

                    _unitOfWork.ProductGenre.Add(
                        new ProductGenre()
                        {
                            ProductId = createdProduct.Id,
                            GenreId = foundGenre.Id
                        });
                }
                _unitOfWork.Save();
            }

            var images = worksheet.Drawings.Select(u => u as ExcelPicture);

            var filteredImages = images.Where(u => u.From.Row == row - 1);

            foreach (var image in filteredImages)
            {
                _imageService.SaveImagesFromExcelFile(image, excelProduct.ProductType.ToLower(), createdProduct);
            }
        }

        private ProductMovie CreateMovieFromExcel(ExcelProduct excelProduct, CultureInfo cultureInfo)
        {
            var productTypeFromDb = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Movie);
            var formatFromDb = _unitOfWork.Format.GetFirstOrDefault(u => u.Name == excelProduct.Format);

            var directorFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Director.ToString());

            if (directorFromDb == null)
            {
                directorFromDb = new Name() { Fullname = excelProduct.Director.ToString() };

                _unitOfWork.Name.Add(directorFromDb);

                _unitOfWork.Save();
            }

            var newMovie = new ProductMovie()
            {
                Name = excelProduct.Title,
                Description = excelProduct.Description,
                Price = decimal.Parse(excelProduct.Price),
                Discount = decimal.Parse(excelProduct.Discount),
                StockQuantity = int.Parse(excelProduct.Quantity),
                FormatId = formatFromDb.Id,
                ProductTypeId = productTypeFromDb.Id,
                ReleaseDate = DateTime.Parse(excelProduct.ReleaseDate, cultureInfo),
                AddedToStoreDate = DateTime.Now,
                DirectorNameId = directorFromDb.Id,
            };

            _unitOfWork.ProductMovie.Add(newMovie);
            _unitOfWork.Save();

            var excelActors = excelProduct.Actors.ToString().Split(",");

            foreach (var excelActor in excelActors)
            {
                var actorFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelActor);

                if (actorFromDb == null)
                {
                    actorFromDb = new Name() { Fullname = excelActor };

                    _unitOfWork.Name.Add(actorFromDb);

                    _unitOfWork.Save();
                }

                var movieActor = new MovieActor() { NameId = actorFromDb.Id, ProductMovieId = newMovie.Id };

                _unitOfWork.MovieActor.Add(movieActor);

                _unitOfWork.Save();
            }

            return newMovie;
        }

        private ProductMusic CreateMusicFromExcel(ExcelProduct excelProduct, CultureInfo cultureInfo)
        {
            var productTypeFromDb = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Music);
            var formatFromDb = _unitOfWork.Format.GetFirstOrDefault(u => u.Name == excelProduct.Format);

            var artistFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Artist.ToString());
            var publisherFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Publisher.ToString());
            var labelFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Label.ToString());

            if (artistFromDb == null)
            {
                artistFromDb = new Name() { Fullname = excelProduct.Artist.ToString() };

                _unitOfWork.Name.Add(artistFromDb);

                _unitOfWork.Save();
            }

            if (publisherFromDb == null)
            {
                publisherFromDb = new Name() { Fullname = excelProduct.Publisher.ToString() };

                _unitOfWork.Name.Add(publisherFromDb);

                _unitOfWork.Save();
            }

            if (labelFromDb == null)
            {
                labelFromDb = new Name() { Fullname = excelProduct.Label.ToString() };

                _unitOfWork.Name.Add(labelFromDb);

                _unitOfWork.Save();
            }

            var newMusic = new ProductMusic()
            {
                Name = excelProduct.Title,
                Description = excelProduct.Description,
                Price = decimal.Parse(excelProduct.Price),
                Discount = decimal.Parse(excelProduct.Discount),
                StockQuantity = int.Parse(excelProduct.Quantity),
                FormatId = formatFromDb.Id,
                ProductTypeId = productTypeFromDb.Id,
                ReleaseDate = DateTime.Parse(excelProduct.ReleaseDate, cultureInfo),
                AddedToStoreDate = DateTime.Now,
                ArtistId = artistFromDb.Id,
                PublisherId = publisherFromDb.Id,
                LabelId = labelFromDb.Id,
            };

            _unitOfWork.ProductMusic.Add(newMusic);
            _unitOfWork.Save();

            return newMusic;
        }

        private ProductBook CreateBookFromExcel(ExcelProduct excelProduct, CultureInfo cultureInfo)
        {
            var productTypeFromDb = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Book);
            var formatFromDb = _unitOfWork.Format.GetFirstOrDefault(u => u.Name == excelProduct.Format);

            var authorFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Author.ToString());
            var publisherFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Publisher.ToString());

            if (authorFromDb == null)
            {
                authorFromDb = new Name() { Fullname = excelProduct.Author.ToString() };

                _unitOfWork.Name.Add(authorFromDb);

                _unitOfWork.Save();
            }

            if (publisherFromDb == null)
            {
                publisherFromDb = new Name() { Fullname = excelProduct.Publisher.ToString() };

                _unitOfWork.Name.Add(publisherFromDb);

                _unitOfWork.Save();
            }

            var newBook = new ProductBook()
            {
                Name = excelProduct.Title,
                Description = excelProduct.Description,
                Price = decimal.Parse(excelProduct.Price),
                Discount = decimal.Parse(excelProduct.Discount),
                StockQuantity = int.Parse(excelProduct.Quantity),
                FormatId = formatFromDb.Id,
                ProductTypeId = productTypeFromDb.Id,
                ReleaseDate = DateTime.Parse(excelProduct.ReleaseDate, cultureInfo),
                AddedToStoreDate = DateTime.Now,
                AuthorId = authorFromDb.Id,
                PublisherId = publisherFromDb.Id,
            };

            _unitOfWork.ProductBook.Add(newBook);
            _unitOfWork.Save();

            return newBook;
        }

        private ProductGame CreateGameFromExcel(ExcelProduct excelProduct, CultureInfo cultureInfo)
        {
            var productTypeFromDb = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Game);
            var formatFromDb = _unitOfWork.Format.GetFirstOrDefault(u => u.Name == excelProduct.Format);

            var developerFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Developer.ToString());
            var publisherFromDb = _unitOfWork.Name.GetFirstOrDefault(u => u.Fullname == excelProduct.Publisher.ToString());

            if (developerFromDb == null)
            {
                developerFromDb = new Name() { Fullname = excelProduct.Developer.ToString() };

                _unitOfWork.Name.Add(developerFromDb);

                _unitOfWork.Save();
            }

            if (publisherFromDb == null)
            {
                publisherFromDb = new Name() { Fullname = excelProduct.Publisher.ToString() };

                _unitOfWork.Name.Add(publisherFromDb);

                _unitOfWork.Save();
            }

            var newGame = new ProductGame()
            {
                Name = excelProduct.Title,
                Description = excelProduct.Description,
                Price = decimal.Parse(excelProduct.Price),
                Discount = decimal.Parse(excelProduct.Discount),
                StockQuantity = int.Parse(excelProduct.Quantity),
                FormatId = formatFromDb.Id,
                ProductTypeId = productTypeFromDb.Id,
                ReleaseDate = DateTime.Parse(excelProduct.ReleaseDate, cultureInfo),
                AddedToStoreDate = DateTime.Now,
                DeveloperId = developerFromDb.Id,
                PublisherId = publisherFromDb.Id,
            };

            _unitOfWork.ProductGame.Add(newGame);
            _unitOfWork.Save();

            return newGame;
        }

        private ExcelProduct GetExcelProductFromSheet(ExcelWorksheet worksheet, int row)
        {
            var excelProduct = new ExcelProduct()
            {
                Title = worksheet.Cells[row, 1].Value.ToString(),
                Description = worksheet.Cells[row, 2].Value.ToString(),
                Price = worksheet.Cells[row, 3].Value.ToString(),
                Quantity = worksheet.Cells[row, 4].Value.ToString(),
                Discount = worksheet.Cells[row, 5].Value.ToString(),
                Genres = worksheet.Cells[row, 6].Value.ToString(),
                Format = worksheet.Cells[row, 7].Value.ToString(),
                ProductType = worksheet.Cells[row, 8].Value.ToString(),
                ReleaseDate = worksheet.Cells[row, 9].Value.ToString(),
                Developer = worksheet.Cells[row, 11].Value,
                Publisher = worksheet.Cells[row, 12].Value,
                Author = worksheet.Cells[row, 13].Value,
                Artist = worksheet.Cells[row, 14].Value,
                Label = worksheet.Cells[row, 15].Value,
                Director = worksheet.Cells[row, 16].Value,
                Actors = worksheet.Cells[row, 17].Value
            };

            return excelProduct;
        }
    }
}
