using AutoMapper;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Credentials;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository repository;

        public CategoryController(ICategoryRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet]
        public ActionResult GetCategories()
        {
            var model = new ListResult<CategoryResult>
            {
                Success = true,
                Items = Mapper.Map<IEnumerable<CategoryResult>>(this.repository.Categories)
                    .ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = ""
            };

            return Ok(model); // 200
        }

        [HttpGet("{id}")]
        public IActionResult GetCategory(int id)
        {
            var category = this.repository.Get(id);
            if (category == null)
            {
                return NotFound(); // 404
            }

            var result = new DataResult<CategoryResult>
            {
                Success = true,
                Item = Mapper.Map<CategoryResult>(category)
            };
            return Ok(result); // 200
        }
    }
}