using Moq;
using Microsoft.AspNetCore.Mvc;
using ProductManagementApi.Controllers;
using ProductManagementApi.Models;
using ProductManagementApi.Requests;
using MediatR;
using ProductManagementApi.Helpers; 

public class ProductsControllerTests
{
    private readonly Mock<IMediator> _mediatorMock;
    private readonly ProductsController _controller;

    public ProductsControllerTests()
    {
        _mediatorMock = new Mock<IMediator>();
        _controller = new ProductsController(_mediatorMock.Object);
    }

    [Fact]
    public async Task RegisterProduct_ReturnsCreatedAtActionResult_WithProduct()
    {
        var request = new RegisterProductRequest
        {
            Category = "Book",
            Name = "The BFG",
            ProductCode = "product_code_9",
            Price = 13.29m,
            StockQuantity = 8
        };

        var expectedProduct = new Product
        {
            Id = 1,
            Category = request.Category,
            Name = request.Name,
            ProductCode = request.ProductCode,
            Price = request.Price,
            StockQuantity = request.StockQuantity
        };

        _mediatorMock.Setup(m => m.Send(request, default)).ReturnsAsync(expectedProduct);

        var result = await _controller.RegisterProduct(request);

        var createdAtResult = Assert.IsType<CreatedAtActionResult>(result.Result);

        var product = Assert.IsType<Product>(createdAtResult.Value);

        Assert.Equal(expectedProduct.Name, product.Name);
    }

    [Fact]
    public async Task GetFilteredProducts_ReturnsOkResult_WithPagedListOfProducts()
    {
        var request = new GetProductsRequest
        {
            SortBy = "Price",
            SortOrder = "asc",
            Page = 1,
            PageSize = 10,
            Filter = new ProductFilter { Category = "Book" }
        };

        var productList = new List<Product>
        {
            new Product { Id = 1, Category = "Book", Name = "Fantastic Mr Fox", ProductCode = "product_code_1", Price = 12.78m, StockQuantity = 10, DateAdded = DateTime.Now },
            new Product { Id = 2, Category = "Book", Name = "James and the Giant Peach", ProductCode = "product_code_2", Price = 20.99m, StockQuantity = 20, DateAdded = DateTime.Now }
        };

        var pagedList = new PagedList<Product>(productList, 1, 10, productList.Count, 21);

        _mediatorMock.Setup(m => m.Send(request, default)).ReturnsAsync(pagedList);

        var result = await _controller.GetFilteredProducts(request);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);

        var products = Assert.IsType<PagedList<Product>>(okResult.Value);

        Assert.Equal(2, products.Items.Count);

        Assert.Equal("Fantastic Mr Fox", products.Items.First().Name);
    }
}
