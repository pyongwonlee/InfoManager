using InfoManager.DataAccess.Models;
using System.Collections.Generic;

namespace InfoManager.Web.Models
{
    public class DataIndexResult<T> : ResultBase
    {
        public T[] Items { get; set; }

        public int TotalCount { get; set; }
        public string SearchString { get; set; }
    }
}
