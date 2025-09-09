namespace IntelligentECommerce.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }

        // Navigation property for orders
        public List<Order> Orders { get; set; } = new();
    }
}
