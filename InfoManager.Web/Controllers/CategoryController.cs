using AutoMapper;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Helpers;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Credentials;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    [Route("api/categories")]
    [ValidationHandle]
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

        [HttpGet("create")]
        public IActionResult Create()
        {
            var model = new DataResult<CategoryResult>
            {
                Success = true,
                Item = new CategoryResult()
                    {
                        Name = string.Empty,
                        Companies = new CategoryResult.Company[] { }
                    }
            };
            return Ok(model);
        }

        [HttpPost]
        public IActionResult Create([FromBody]CategoryArgument category)
        {
            if (category == null)
            {
                return BadRequest(ResultBase.ErrorResult("Category is null")); // 400
            }

            var categoryData = Mapper.Map<Category>(category);
            if (repository.Exists(categoryData.Name))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            repository.Add(categoryData);
            var result = Mapper.Map<CategoryResult>(categoryData);

            return CreatedAtRoute("GetCategory", new { Id = result.CategoryId }, result); // 201
        }

        [HttpGet("{id}", Name = "GetCategory")]
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

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] CategoryArgument category)
        {
            if (category == null)
            {
                return BadRequest(ResultBase.ErrorResult("Category is null")); // 400
            }

            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404
            }

            var categoryData = Mapper.Map<Category>(category);
            categoryData.CategoryId = id;
            this.repository.Update(categoryData);

            return Ok(categoryData);
        }

        [HttpGet("delete")]
        public IActionResult Delete(int id)
        {
            var category = this.repository.Find(id);
            if (category == null)
            {
                return NotFound(); // 404
            }

            return Ok(category);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfirm(int id)
        {
            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404             
            }

            this.repository.Delete(id);

            return NoContent(); // 204
        }
    }
}