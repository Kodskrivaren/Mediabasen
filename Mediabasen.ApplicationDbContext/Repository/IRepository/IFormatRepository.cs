using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IFormatRepository : IRepository<Format>
    {
        public void Update(Format formats);
    }
}
