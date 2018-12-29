using AutoMapper;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Movies;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [Route("api/directors")]
    [ApiController]
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

        [HttpGet("create")]
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

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody]DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest();
            }

            var directorData = Mapper.Map<Director>(director);
            if (!repository.Exists(directorData.Name))
            {
                repository.Add(directorData);
            }
            else
            {
                // TODO: Add Error
            }
            return Ok(directorData);
        }

        [HttpGet("{id}")]
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

        [HttpPut]
        [Route("edit")]
        public IActionResult Edit([FromBody] DirectorArgument director)
        {
            if (director == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (this.repository.Find(director.Id) == null)
            {
                // TODO: Add Error
            }

            var directorData = Mapper.Map<Director>(director);
            this.repository.Update(directorData);

            return Ok(directorData);
        }

        [HttpGet]
        [Route("delete")]
        public IActionResult Delete(int id)
        {
            var director = this.repository.Find(id);
            if (director == null)
            {
                return NotFound(); // 404
            }

            return Ok(director);
        }

        [HttpDelete]
        [Route("")]
        public IActionResult DeleteConfirm(int id)
        {
            if (this.repository.Find(id) == null)
            {
                // TODO: Add Error                
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