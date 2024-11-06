using MediatR;
using ProductManagementApi.Models;

namespace ProductManagementApi.Requests
{
    public class RegisterProductRequest : IRequest<Product>
    {
        public required string Category { get; set; } 

        public required string Name { get; set; } 

        public required string ProductCode { get; set; } 

        public decimal Price { get; set; }    

        public int StockQuantity { get; set; }        

        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
    }
}