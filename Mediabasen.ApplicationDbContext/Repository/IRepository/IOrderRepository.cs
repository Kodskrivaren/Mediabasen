using Mediabasen.Models.Order;

namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IOrderRepository : IRepository<Order>
    {
        public void Update(Order orders);
    }
}
