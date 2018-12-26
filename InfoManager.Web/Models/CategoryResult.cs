using System.Collections.Generic;

namespace InfoManager.Web.Models
{
    public class CategoryResult : ResultBase
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public Company[] Companies { get; set; }

        public class Company
        {
            public int CompanyId { get; set; }
            public string Name { get; set; }
        }
    }
}
