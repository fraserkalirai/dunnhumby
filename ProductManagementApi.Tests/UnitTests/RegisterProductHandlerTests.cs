using ProductManagementApi.Handlers;
using ProductManagementApi.Requests;
using ProductManagementApi.Data;
using Microsoft.EntityFrameworkCore;

public class RegisterProductHandlerTests
{
    private readonly RegisterProductHandler _handler;
    private readonly ProductContext _context;

    public RegisterProductHandlerTests()
    {
        var options = new DbContextOptionsBuilder<ProductContext>()
            .UseInMemoryDatabase(databaseName: "TestProductDatabase")
            .Options;

        _context = new ProductContext(options);

        _handler = new RegisterProductHandler(_context);
    }

    [Fact]
    public async Task Handle_AddsProductToDatabase()
    {
        var request = new RegisterProductRequest
        {
            Category = "Book",
            Name = "George's Marvelous Medicine",
            ProductCode = "product_code_4",
            Price = 7.50m,
            StockQuantity = 1
        };

        var result = await _handler.Handle(request, CancellationToken.None);

        Assert.NotNull(result);

        Assert.Equal(request.Name, result.Name);

        var addedProduct = await _context.Products.FirstOrDefaultAsync(p => p.ProductCode == "product_code_4");

        Assert.NotNull(addedProduct);

        Assert.Equal(request.Name, addedProduct.Name);
    }
}
