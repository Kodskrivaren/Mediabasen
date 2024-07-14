using Mediabasen.Models.Product.Music;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IProductMusicRepository : IRepository<ProductMusic>
    {
        public void Update(ProductMusic productMusic);
    }
}
