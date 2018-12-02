using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public int? Tomatometer { get; set; }
        public double? Imdbrating { get; set; }
        public int DirectorId { get; set; }

        public Director Director { get; set; }
    }
}
