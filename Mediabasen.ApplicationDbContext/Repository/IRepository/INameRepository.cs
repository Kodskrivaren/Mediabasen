using Mediabasen.Models.Product;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface INameRepository : IRepository<Name>
    {
        public void Update(Name productMovie);
    }
}
