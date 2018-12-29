using AutoMapper;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Credentials;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository repository;

        public CategoryController(ICategoryRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet("api/categories")]
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

        [HttpGet("api/categories/create")]
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

        [HttpPost("api/categories")]
        public IActionResult Create([FromBody]CategoryArgument category)
        {
            if (category == null)
            {
                return BadRequest(); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // 400
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

        [HttpGet("api/categories/{id}", Name = "GetCategory")]
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

        [HttpPut("api/categories")]
        public IActionResult Edit([FromBody] CategoryArgument category)
        {
            if (category == null)
            {
                return BadRequest(); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // 400
            }

            if (this.repository.Find(category.CategoryId) == null)
            {
                return NotFound(); // 404
            }

            var categoryData = Mapper.Map<Category>(category);
            this.repository.Update(categoryData);

            return Ok(categoryData);
        }

        [HttpGet("api/categories/delete")]
        public IActionResult Delete(int id)
        {
            var category = this.repository.Find(id);
            if (category == null)
            {
                return NotFound(); // 404
            }

            return Ok(category);
        }

        [HttpDelete("api/categories")]
        public IActionResult DeleteConfirm(int id)
        {
            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404             
            }

            this.repository.Delete(id);
            var result = new ResultBase
            {
                Success = true
            };
            return Ok(result);
        }
    }
}