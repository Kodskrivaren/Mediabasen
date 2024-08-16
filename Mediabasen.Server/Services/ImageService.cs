using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using OfficeOpenXml.Drawing;

namespace Mediabasen.Server.Services
{
    public class ImageService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUnitOfWork _unitOfWork;

        public ImageService(IWebHostEnvironment webHostEnvironment, IUnitOfWork unitOfWork)
        {
            _webHostEnvironment = webHostEnvironment;
            _unitOfWork = unitOfWork;
        }

        public void UpdateImages(IEnumerable<IFormFile> formImages, Product product, string productTypePath)
        {
            var imagesFromDb = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id).ToList();
            List<IFormFile> imagesToAdd = new List<IFormFile>();
            List<ProductImage> searchedImages = new List<ProductImage>();

            foreach (var image in formImages)
            {
                var foundImage = imagesFromDb.Find(u => u.ImageUrl.Contains(image.FileName));

                if (foundImage == null)
                {
                    imagesToAdd.Add(image);
                }
                else
                {
                    searchedImages.Add(foundImage);
                }
            }

            foreach (var image in imagesFromDb)
            {
                var foundImage = searchedImages.Find(u => u.Id == image.Id);

                if (foundImage == null)
                {
                    RemoveImage(image);
                    _unitOfWork.ProductImage.Remove(image);
                    _unitOfWork.Save();
                }
            }

            if (imagesToAdd.Count() > 0)
            {
                SaveImages(imagesToAdd, product, productTypePath);
            }
        }

        public void RemoveImage(ProductImage image)
        {
            string rootPath = _webHostEnvironment.WebRootPath;

            var path = Path.Join(rootPath, image.ImageUrl);

            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }

        public void SaveImages(IEnumerable<IFormFile> Images, Product newProduct, string productTypePath)
        {
            var wwwRoot = _webHostEnvironment.WebRootPath;
            foreach (var image in Images)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                string productPath = Path.Combine(
                    new string[]
                    {
                        @"images",
                        productTypePath,
                        productTypePath + "-" + newProduct.Id
                    });
                string finalPath = Path.Combine(wwwRoot, productPath);

                if (!Directory.Exists(finalPath))
                {
                    Directory.CreateDirectory(finalPath);
                }

                using (var fileStream = new FileStream(Path.Combine(finalPath, fileName), FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }

                string dbProductPath = @"images\" + productTypePath + @"\" + productTypePath + "-" + newProduct.Id;

                AddImageToDb(dbProductPath, fileName, newProduct);
            }
            _unitOfWork.Save();
        }

        private void AddImageToDb(string productPath, string fileName, Product newProduct)
        {
            ProductImage productImage = new ProductImage()
            {
                ImageUrl = @"\" + productPath + @"\" + fileName,
                ProductId = newProduct.Id,
            };

            _unitOfWork.ProductImage.Add(productImage);

            _unitOfWork.Save();
        }

        public void SaveImagesFromExcelFile(ExcelPicture image, string productTypePath, Product newProduct)
        {
            var wwwRoot = _webHostEnvironment.WebRootPath;

            string fileName = Guid.NewGuid().ToString() + "." + image.Image.Type;
            string productPath = Path.Combine(
                new string[]
                {
                    @"images",
                    productTypePath,
                    productTypePath + "-" + newProduct.Id
                });
            string finalPath = Path.Combine(wwwRoot, productPath);

            if (!Directory.Exists(finalPath))
            {
                Directory.CreateDirectory(finalPath);
            }

            using (var fileStream = new FileStream(Path.Combine(finalPath, fileName), FileMode.Create))
            {
                fileStream.Write(image.Image.ImageBytes);
            }

            string dbProductPath = @"images\" + productTypePath + @"\" + productTypePath + "-" + newProduct.Id;

            AddImageToDb(dbProductPath, fileName, newProduct);
        }
    }
}
