using System.ComponentModel.DataAnnotations;

public class ProductFilter
{
    public string? Category { get; set; }
    public string? Name { get; set; }
    public string? ProductCode { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Minimum price must at least be 0.0")]
    public decimal? PriceMin { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Maximum price must at least be 0.0")]
    public decimal? PriceMax { get; set; }

    public bool? Avaliable { get; set; }
}
