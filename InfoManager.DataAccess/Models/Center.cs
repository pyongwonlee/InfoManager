using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Center
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string WebAddress { get; set; }
        public string Description { get; set; }
        public string Note { get; set; }
        public int CityId { get; set; }

        public City City { get; set; }
    }
}
