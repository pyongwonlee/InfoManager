using InfoManager.DataAccess.Models;

namespace InfoManager.Web.Models.Books
{
    public class BookResult
    {
        public int BookId { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Publisher { get; set; }
        public string Location { get; set; }
        public string Isbn { get; set; }
    }
}
