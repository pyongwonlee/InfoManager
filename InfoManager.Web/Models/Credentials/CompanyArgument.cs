using System.ComponentModel.DataAnnotations;

namespace InfoManager.Web.Models.Credentials
{
    public class CompanyArgument
    {
        [Required(ErrorMessage = "Company Name is required")]
        [MaxLength(250, ErrorMessage = "Comapny Name cannot exceeds 250 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Company Description is required")]
        public string Description { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(250, ErrorMessage = "Web Address cannot exceeds 250 characters")]
        public string WebAddress { get; set; }

        public int CategoryId { get; set; }
    }
}
