using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Province
    {
        public Province()
        {
            Cities = new HashSet<City>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; }

        public virtual ICollection<City> Cities { get; set; }
    }
}
