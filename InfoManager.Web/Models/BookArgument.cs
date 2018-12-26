using System.ComponentModel.DataAnnotations;

namespace InfoManager.Web.Models
{
    public class BookArgument
    {
        public int BookId { get; set; }

        [Required(ErrorMessage = "Book Author is required")]
        [MaxLength(250, ErrorMessage = "Book Author cannot exceeds 250 characters")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Book Title is required")]
        [MaxLength(250, ErrorMessage = "Book Title cannot exceeds 250 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Book Published Year is required")]
        public int Year { get; set; }

        [MaxLength(250, ErrorMessage = "Publisher cannot exceeds 250 characters")]
        public string Publisher { get; set; }

        [MaxLength(250, ErrorMessage = "Location cannot exceeds 250 characters")]
        public string Location { get; set; }

        [MaxLength(50, ErrorMessage = "ISBN cannot exceeds 50 characters")]
        public string Isbn { get; set; }
    }
}
