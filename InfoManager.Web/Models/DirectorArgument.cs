using System.ComponentModel.DataAnnotations;

namespace InfoManager.Web.Models
{
    public class DirectorArgument
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Director Name is required")]
        [MaxLength(100, ErrorMessage = "Director Name cannot exceeds 100 characters")]
        public string Name { get; set; }
    }
}
