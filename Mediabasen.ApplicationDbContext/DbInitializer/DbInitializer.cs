using Mediabasen.DataAccess.Data;
using Mediabasen.DataAccess.Repository.IRepository;
using Mediabasen.Models.Product;
using Mediabasen.Utility.SD;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Mediabasen.DataAccess.DbInitializer
{
    public class DbInitializer : IDbInitializer
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _db;
        private readonly IUnitOfWork _unitOfWork;
        public DbInitializer(RoleManager<IdentityRole> roleManager, ApplicationDbContext db, IUnitOfWork unitOfWork)
        {
            _db = db;
            _roleManager = roleManager;
            _unitOfWork = unitOfWork;
        }

        public void Initialize(WebApplicationBuilder builder)
        {
            try
            {
                if (_db.Database.GetPendingMigrations().Count() > 0)
                {
                    _db.Database.Migrate();
                }
            }
            catch (Exception ex) { }

            if (!_roleManager.RoleExistsAsync(SD.Role_Admin).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(SD.Role_Admin)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(SD.Role_Employee)).GetAwaiter().GetResult();
            }

            var test = _unitOfWork.ProductType.GetFirstOrDefault(u => u.Name == SD.Type_Movie);

            if (test == null)
            {
                _db.ProductTypes.Add(new ProductType() { Name = SD.Type_Movie });
                _db.ProductTypes.Add(new ProductType() { Name = SD.Type_CD });
                _db.ProductTypes.Add(new ProductType() { Name = SD.Type_Game });
                _db.ProductTypes.Add(new ProductType() { Name = SD.Type_Book });
                _db.SaveChanges();
            }
        }
    }
}
