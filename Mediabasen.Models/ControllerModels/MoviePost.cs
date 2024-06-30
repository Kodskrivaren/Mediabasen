﻿using Microsoft.AspNetCore.Http;

namespace Mediabasen.Models.ControllerModels
{
    public class MoviePost
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public int DirectorId { get; set; }
        public List<int>? ActorIds { get; set; }
        public List<IFormFile>? Images { get; set; }
    }
}
