using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Company
    {
        public Company()
        {
            Passwords = new HashSet<Password>();
        }

        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WebAddress { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public virtual ICollection<Password> Passwords { get; set; }
    }
}
