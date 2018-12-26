using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InfoManager.Web.Controllers
{
    [Route("api/director")]
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
        [Route("")]
        public IActionResult Index(int page = 1, string searchTerm = "")
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "" : searchTerm.Trim();

            var model = new DataIndexResult<Director>
            {
                Success = true,
                Items = this.repository.GetDirectorsInPage(searchTerm, page, PAGE_SIZE).ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm
            };

            return Ok(model);
        }

        [HttpGet]
        [Route("search")]
        public IActionResult Search(string searchTerm = "")
        {
            int page = 1;
            return Index(page, searchTerm);
        }

        [HttpGet]
        [Route("create")]
        public IActionResult Create()
        {
            var model = new DirectorResult
            {
                Success = true,
                Director = new Director() { Name = "" }
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

            var directorData = director.ToDirector();
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

        [HttpGet]
        [Route("{id}")]
        public IActionResult Edit(int id)
        {
            var director = this.repository.Find(id);
            if (director == null)
            {
                return NotFound();
            }

            var result = new DirectorResult
            {
                Success = true,
                Director = director
            };
            return Ok(result);
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

            var directorData = director.ToDirector();
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
                return NotFound();
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