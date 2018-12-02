using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Models
{
    public partial class Password
    {
        public int PasswordId { get; set; }
        public string UserName { get; set; }
        public string PasswordCode { get; set; }
        public string Note1 { get; set; }
        public string Note2 { get; set; }
        public string Note3 { get; set; }
        public string Note4 { get; set; }
        public string Note5 { get; set; }
        public string Comment { get; set; }
        public int CompanyId { get; set; }

        public Company Company { get; set; }
    }
}
