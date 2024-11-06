using ProductManagementApi.Handlers;
using ProductManagementApi.Requests;
using ProductManagementApi.Data;
using ProductManagementApi.Models;
using Microsoft.EntityFrameworkCore;

public class GetProductsHandlerTests
{
    private readonly GetProductsHandler _handler;
    private readonly ProductContext _context;

    public GetProductsHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ProductContext>()
            .UseInMemoryDatabase(databaseName: "TestProductDatabase")
            .Options;

        _context = new ProductContext(options);

        _handler = new GetProductsHandler(_context);
    }

    [Fact]
    public async Task Handle_ReturnsFilteredAndPagedProducts()
    {
        _context.Products.AddRange(
            new Product { Category = "Book", Name = "Charlie and the Chocolate Factory", ProductCode = "product_code_8", Price = 6.99m, StockQuantity = 14 },
            new Product { Category = "Book", Name = "The BFG", ProductCode = "product_code_9", Price = 13.29m, StockQuantity = 4 },
            new Product { Category = "Toy", Name = "Water Pistol", ProductCode = "product_code_7", Price = 10.00m, StockQuantity = 45 }
        );

        await _context.SaveChangesAsync();

        var request = new GetProductsRequest
        {
            SortBy = "Price",
            SortOrder = "desc",
            Page = 1,
            PageSize = 2,
            Filter = new ProductFilter { Category = "Book" }
        };
        
        var result = await _handler.Handle(request, CancellationToken.None);
        
        Assert.Equal(2, result.Items.Count); 
        
        Assert.Equal("The BFG", result.Items.First().Name);
    }
}
