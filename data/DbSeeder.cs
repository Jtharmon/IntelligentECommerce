using IntelligentECommerce.Models;

namespace IntelligentECommerce.Data
{
    public static class DbSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product { Name = "Smartphone", Description = "Latest model smartphone", Price = 799.99m, Stock = 50 },
                    new Product { Name = "Laptop", Description = "High-performance laptop", Price = 1299.99m, Stock = 30 },
                    new Product { Name = "Headphones", Description = "Noise-cancelling headphones", Price = 199.99m, Stock = 100 }
                );

                context.SaveChanges();
            }
        }
    }
}
