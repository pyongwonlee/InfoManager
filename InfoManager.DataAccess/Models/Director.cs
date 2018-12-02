using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Director
    {
        public Director()
        {
            Movies = new HashSet<Movie>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Movie> Movies { get; set; }
    }
}
