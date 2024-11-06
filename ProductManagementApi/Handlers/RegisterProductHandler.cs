using MediatR;
using ProductManagementApi.Data;
using ProductManagementApi.Models;
using ProductManagementApi.Requests;

namespace ProductManagementApi.Handlers
{
    public class RegisterProductHandler : IRequestHandler<RegisterProductRequest, Product>
    {
        private readonly ProductContext _context;

        public RegisterProductHandler(ProductContext context)
        {
            _context = context;
        }

        public async Task<Product> Handle(RegisterProductRequest request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Category = request.Category,
                Name = request.Name,
                ProductCode = request.ProductCode,
                Price = request.Price,
                StockQuantity = request.StockQuantity
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync(cancellationToken);

            return product;
        }
    }
}
