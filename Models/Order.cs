using System.ComponentModel.DataAnnotations.Schema;

namespace IntelligentECommerce.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        // Foreign key for User
        public int UserId { get; set; }
        public User? User { get; set; }

        // List of products in this order
        public List<Product> Products { get; set; } = new();
    }
}
