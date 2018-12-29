using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Category
    {
        public Category()
        {
            Companies = new HashSet<Company>();
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Company> Companies { get; set; }
    }
}
