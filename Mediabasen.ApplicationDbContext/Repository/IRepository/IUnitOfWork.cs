namespace Mediabasen.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        public IProductRepository Product { get; }
        void Save();
    }
}
