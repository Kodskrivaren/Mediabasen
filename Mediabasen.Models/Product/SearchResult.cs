namespace Mediabasen.Models.Product
{
    public class SearchResult
    {
        public IEnumerable<Product> Products { get; set; }
        public int TotalHits { get; set; }
        public SearchResult(IEnumerable<Product> products, int totalHits)
        {
            Products = products;
            TotalHits = totalHits;
        }
    }
}
