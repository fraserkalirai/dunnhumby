using MediatR;
using ProductManagementApi.Helpers;
using ProductManagementApi.Models;

namespace ProductManagementApi.Requests
{
    public class GetProductsRequest : IRequest<PagedList<Product>>
    {
        public required string SortBy { get; set; }

        public required string SortOrder { get; set; }

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;

        public required ProductFilter Filter { get; set; }
    }
}