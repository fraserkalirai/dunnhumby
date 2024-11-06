using Microsoft.EntityFrameworkCore;
using ProductManagementApi.Data;

namespace ProductManagementApi.Helpers
{
    public class PagedList<T> 
    {
        public PagedList(List<T> items, int page, int pageSize, int totalCount, int maxPrice)
        {
            Items = items;
            Page = page;
            PageSize = pageSize;
            TotalCount = totalCount;
            MaxPrice = maxPrice;
        }

        public List<T> Items { get; set; }

        public int Page { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public int MaxPrice { get; set; }

        public bool HasNextPage => Page * PageSize < TotalCount;

        public bool HasPreviousPage => Page > 1;

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> query, int page, int pageSize, ProductContext context)
        {
            // Calculate max price from all products, ignoring filters to be sent for product filtering.
            decimal maxPriceDecimal = await context.Products
              .Select(product => product.Price)
              .MaxAsync();

            if (maxPriceDecimal == 0)
            {
                maxPriceDecimal = 100;
            }
        
            int maxPrice = (int)Math.Ceiling(maxPriceDecimal);

            var totalCount = await query.CountAsync();
            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            
            return new PagedList<T>(items, page, pageSize, totalCount, maxPrice);
        }
    }
}
