using MVC5AngularJS.Models;
using System.Data.Entity;


namespace MVC5AngularJS.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext() : base("StringDbContext") { }

        public DbSet<ProductModel> Products { get; set; }
    }
}