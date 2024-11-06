using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProductManagementApi.Requests;
using ProductManagementApi.Models;
using ProductManagementApi.Helpers;

namespace ProductManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Product>> RegisterProduct([FromBody] RegisterProductRequest request)
        {
            var product = await _mediator.Send(request);
            return CreatedAtAction(nameof(RegisterProduct), new { id = product.Id }, product);
        }

        [HttpPost("get")]
        public async Task<ActionResult<PagedList<Product>>> GetFilteredProducts([FromBody] GetProductsRequest request)
        {
            var products = await _mediator.Send(request);
            return Ok(products);
        }
    }
}
