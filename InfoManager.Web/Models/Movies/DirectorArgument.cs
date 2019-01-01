using System.ComponentModel.DataAnnotations;

namespace InfoManager.Web.Models.Movies
{
    public class DirectorArgument
    {
        [Required(ErrorMessage = "Director Name is required")]
        [MaxLength(100, ErrorMessage = "Director Name cannot exceeds 100 characters")]
        public string Name { get; set; }
    }
}
