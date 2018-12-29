using AutoMapper;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Movies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private IDirectorRepository repository;
        private const int PAGE_SIZE = 20;

        public DirectorController(IDirectorRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet("api/directors")]
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

        [HttpGet("api/directors/search")]
        public IActionResult Search(string searchTerm = "")
        {
            int page = 1;
            return GetDirectors(page, searchTerm);
        }

        [HttpGet("api/directors/create")]
        public IActionResult Create()
        {
            var model = new DataResult<DirectorResult>
            {
                Success = true,
                Item = new DirectorResult
                {
                    Id = 0,
                    Name = string.Empty,
                    Movies = new DirectorResult.Movie[] { }
                }
            };
            return Ok(model);
        }

        [HttpPost("api/directors")]
        public IActionResult Create([FromBody]DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest(); // 400
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

        [HttpGet("api/directors/{id}", Name = "GetDirector")]
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

        [HttpPut("api/directors")]
        public IActionResult Edit([FromBody] DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest(); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // 400
            }

            if (this.repository.Find(director.Id) == null)
            {
                return NotFound(); // 404
            }

            var directorData = Mapper.Map<Director>(director);
            this.repository.Update(directorData);

            return Ok(directorData);
        }

        [HttpGet("api/directors/delete")]
        public IActionResult Delete(int id)
        {
            var director = this.repository.Find(id);
            if (director == null)
            {
                return NotFound(); // 404
            }

            return Ok(director);
        }

        [HttpDelete("api/directors")]
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