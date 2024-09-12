using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Cart;

namespace Mediabasen.Server.Services
{
    public class CartService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CartService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Cart GetCart(string cartId, bool tracked = false)
        {
            if (cartId == null || cartId == "") return null;

            int parsedCartId = int.Parse(cartId);

            return _unitOfWork.Cart.GetFirstOrDefault(u => u.Id == parsedCartId, includeProperties: "CartProducts", tracked: tracked);
        }
    }
}
