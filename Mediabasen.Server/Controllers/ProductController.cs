﻿using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Server.Services;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mediabasen.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ProductService _productService;

        [ActivatorUtilitiesConstructor]
        public ProductController(IUnitOfWork unitOfWork, IWebHostEnvironment webHostEnvironment, ProductService productService)
        {
            _unitOfWork = unitOfWork;
            _webHostEnvironment = webHostEnvironment;
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            List<Product> products = _unitOfWork.Product.GetAll().ToList();
            foreach (var product in products)
            {
                _productService.SetBasicProperties(product, _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId));
            }
            JsonResult res = new JsonResult(new { products });
            return res;
        }

        [HttpGet]
        public IActionResult GetProductById(int productId)
        {
            var product = _unitOfWork.Product.GetFirstOrDefault(u => u.Id == productId);

            if (product == null) return NotFound();

            product.ProductType = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Id == product.ProductTypeId);

            switch (product.ProductType.Name)
            {
                case SD.Type_Movie:
                    return new JsonResult(_productService.GetProductMovie(product));
                case SD.Type_Music:
                    return new JsonResult(_productService.GetProductMusic(product));
                case SD.Type_Book:
                    return new JsonResult(_productService.GetProductBook(product));
                case SD.Type_Game:
                    return new JsonResult(_productService.GetProductGame(product));
                default:
                    return new JsonResult(product);
            }
        }

        [HttpDelete]
        [Authorize(Roles = SD.Role_Admin)]
        [ActionName("DeleteAll")]
        public IActionResult DeleteAll()
        {
            var products = _unitOfWork.Product.GetAll().ToList();

            foreach (var product in products)
            {
                var images = _unitOfWork.ProductImage.GetAll(u => u.ProductId == product.Id);

                if (images != null && images.Count() > 0)
                {
                    var rootPath = _webHostEnvironment.WebRootPath;

                    foreach (var image in images)
                    {
                        var path = Path.Join(rootPath, image.ImageUrl);

                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }

                        _unitOfWork.ProductImage.Remove(image);
                    }
                }

                _unitOfWork.Product.Remove(product);
            }

            _unitOfWork.Save();

            return Ok();
        }
    }
}
