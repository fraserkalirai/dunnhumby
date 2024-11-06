using MediatR;
using Microsoft.EntityFrameworkCore;
using ProductManagementApi.Data;
using ProductManagementApi.Models;
using ProductManagementApi.Requests;
using ProductManagementApi.Helpers;

namespace ProductManagementApi.Handlers
{
    public class GetProductsHandler : IRequestHandler<GetProductsRequest, PagedList<Product>>
    {
        private readonly ProductContext _context;

        public GetProductsHandler(ProductContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Product>> Handle(GetProductsRequest request, CancellationToken cancellationToken)
        {
            var query = _context.Products.AsQueryable();

            // Apply the ProductFilter model onto the query.
            if (request.Filter != null)
            {
                if (!string.IsNullOrWhiteSpace(request.Filter.Category))
                {
                    query = query.Where(p => p.Category.Equals(request.Filter.Category));
                }
                if (!string.IsNullOrWhiteSpace(request.Filter.ProductCode))
                {
                    query = query.Where(p => p.ProductCode.Contains(request.Filter.ProductCode));
                }
                if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                {
                    query = query.Where(p => p.Name.Contains(request.Filter.Name));
                }
                if (request.Filter.PriceMin.HasValue)
                {
                    query = query.Where(p => p.Price >= request.Filter.PriceMin.Value);
                }
                if (request.Filter.PriceMax.HasValue)
                {
                    query = query.Where(p => p.Price <= request.Filter.PriceMax.Value);
                }
                if (request.Filter.Avaliable.HasValue && request.Filter.Avaliable == true)
                {
                    query = query.Where(p => p.StockQuantity > 0);
                }
            }

            // Apply sorting based on selected product attribute.
            query = request.SortOrder == "desc" 
                ? query.OrderByDescending(p => EF.Property<object>(p, request.SortBy))
                : query.OrderBy(p => EF.Property<object>(p, request.SortBy));

            var products = await PagedList<Product>.CreateAsync(
              query,
              request.Page,
              request.PageSize,
              _context
            );

            return products;
        }
    }
}
