using AutoMapper;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Helpers;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Movies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    [Route("api/directors")]
    [ValidationHandle]
    public class DirectorController : ControllerBase
    {
        private IDirectorRepository repository;
        private const int PAGE_SIZE = 20;

        public DirectorController(IDirectorRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet]
        public IActionResult GetDirectors(int page = 1, string searchTerm = "")
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "" : searchTerm.Trim();

            var model = new ListResult<DirectorResult>
            {
                Success = true,
                Items = Mapper.Map<IEnumerable<DirectorResult>>(this.repository.GetDirectorsInPage(searchTerm, page, PAGE_SIZE))
                    .ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm
            };

            return Ok(model); // Status 200
        }

        [HttpGet("search")]
        public IActionResult Search(string searchTerm = "")
        {
            int page = 1;
            return GetDirectors(page, searchTerm);
        }

        [HttpPost]
        public IActionResult Create([FromBody]DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest(ResultBase.ErrorResult("Director is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            var directorData = Mapper.Map<Director>(director);
            if (repository.Exists(directorData.Name))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            repository.Add(directorData);
            var result = Mapper.Map<DirectorResult>(directorData);

            return CreatedAtRoute("GetDirector", new { Id = result.Id }, result); // 201
        }

        [HttpGet("{id}", Name = "GetDirector")]
        public IActionResult GetDirector(int id)
        {
            var director = this.repository.Get(id);
            if (director == null)
            {
                return NotFound(); // 404
            }

            var result = new DataResult<DirectorResult>
            {
                Success = true,
                Item = Mapper.Map<DirectorResult>(director)
            };
            return Ok(result); // 200
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest(ResultBase.ErrorResult("Director is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404
            }

            var directorData = Mapper.Map<Director>(director);
            directorData.Id = id;

            if (repository.Exists(directorData.Name, id))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            this.repository.Update(directorData);

            return Ok(directorData);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
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