﻿using System.ComponentModel.DataAnnotations;

namespace InfoManager.Web.Models.Credentials
{
    public class CategoryArgument
    {
        [Required(ErrorMessage = "Catgeory Name is required")]
        [MaxLength(250, ErrorMessage = "Catgeory Name cannot exceeds 250 characters")]
        [MinLength(2, ErrorMessage = "Catgeory Name must have at least 2 characters")]
        public string Name { get; set; }
    }
}
