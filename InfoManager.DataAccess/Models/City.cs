using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class City
    {
        public City()
        {
            Centers = new HashSet<Center>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ProvinceId { get; set; }

        public Province Province { get; set; }
        public ICollection<Center> Centers { get; set; }
    }
}
