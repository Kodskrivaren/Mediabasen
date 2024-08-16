namespace Mediabasen.Models
{
    public class ExcelProduct
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public string Quantity { get; set; }
        public string Discount { get; set; }
        public string Genres { get; set; }
        public string Format { get; set; }
        public string ProductType { get; set; }
        public string ReleaseDate { get; set; }
        public object? Developer { get; set; }
        public object? Publisher { get; set; }
        public object? Author { get; set; }
        public object? Artist { get; set; }
        public object? Label { get; set; }
        public object? Director { get; set; }
        public object? Actors { get; set; }

        public ExcelProduct() { }

        public ExcelProduct(
            string title,
            string description,
            string price,
            string quantity,
            string discount,
            string genres,
            string format,
            string productType,
            string releaseDate,
            object? developer,
            object? publisher,
            object? author,
            object? artist,
            object? label,
            object? director,
            object? actors)
        {
            this.Title = title;
            this.Description = description;
            this.Price = price;
            this.Quantity = quantity;
            this.Discount = discount;
            this.Genres = genres;
            this.Format = format;
            this.ProductType = productType;
            this.ReleaseDate = releaseDate;
            this.Developer = developer;
            this.Publisher = publisher;
            this.Author = author;
            this.Artist = artist;
            this.Label = label;
            this.Director = director;
            this.Actors = actors;
        }
    }
}
