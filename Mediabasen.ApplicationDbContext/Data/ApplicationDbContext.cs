using Mediabasen.Models;
using Mediabasen.Models.Product;
using Mediabasen.Models.Product.Movie;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Mediabasen.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Name> Names { get; set; }
        public DbSet<ProductMovie> ProductMovies { get; set; }
        public DbSet<MovieActor> MoviesActors { get; set; }
        public DbSet<ProductGenre> ProductGenres { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Format> Formats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
