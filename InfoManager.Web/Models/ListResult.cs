namespace InfoManager.Web.Models
{
    public class ListResult<T> : ResultBase
    {
        public T[] Items { get; set; }

        public int TotalCount { get; set; }
        public string SearchString { get; set; }
    }
}
