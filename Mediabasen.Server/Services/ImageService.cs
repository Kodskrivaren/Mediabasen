using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;

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

        public void SaveImages(IEnumerable<IFormFile> Images, Product newProduct, string productTypePath)
        {
            var wwwRoot = _webHostEnvironment.WebRootPath;
            foreach (var image in Images)
            {
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                string productPath = @"images\" + productTypePath + @"\" + productTypePath + "-" + newProduct.Id;
                string finalPath = Path.Combine(wwwRoot, productPath);

                if (!Directory.Exists(finalPath))
                {
                    Directory.CreateDirectory(finalPath);
                }

                using (var fileStream = new FileStream(Path.Combine(finalPath, fileName), FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }

                ProductImage productImage = new ProductImage()
                {
                    ImageUrl = @"\" + productPath + @"\" + fileName,
                    ProductId = newProduct.Id,
                };

                _unitOfWork.ProductImage.Add(productImage);
            }
            _unitOfWork.Save();
        }
    }
}
