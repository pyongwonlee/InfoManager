namespace InfoManager.Web.Models
{
    public class DataResult<T> : ResultBase
    {
        public T Item { get; set; }
    }
}
