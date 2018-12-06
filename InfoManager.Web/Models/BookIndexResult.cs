using InfoManager.DataAccess.Models;
using System.Collections.Generic;

namespace InfoManager.Web.Models
{
    public class BookIndexResult : ResultBase
    {
        public Book[] Books { get; set; }

        public int TotalCount { get; set; }
        public string SearchString { get; set; }
    }
}
