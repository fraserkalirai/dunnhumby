using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagementApi.Models
{
    public class Product
    {
        public int Id { get; set; }   

        public required string Category { get; set; }    

        public required string Name { get; set; }  

        public required string ProductCode { get; set; }  

        [Column(TypeName = "decimal(18, 2)")]      
        public decimal Price { get; set; }  

        public int StockQuantity { get; set; }  

        public DateTime DateAdded { get; set; } = DateTime.UtcNow;
    }
}
