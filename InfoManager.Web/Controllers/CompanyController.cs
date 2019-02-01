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
    [Route("api/companies")]
    [ValidationHandle]
    public class CompanyController : ControllerBase
    {
        private ICategoryRepository categoryRepository;
        private ICompanyRepository repository;

        private const int PAGE_SIZE = 50;

        public CompanyController(ICategoryRepository categoryRepo, ICompanyRepository repo)
        {
            this.categoryRepository = categoryRepo;
            this.repository = repo;
        }

        [HttpGet]
        public ActionResult GetCompanies(int page = 1)
        {
            string searchTerm = string.Empty;

            var model = new ListResult<CompanyResult>
            {
                Success = true,
                Items = Mapper.Map<IEnumerable<CompanyResult>>(this.repository.GetCompaniesInPage(searchTerm, page, PAGE_SIZE))
                    .ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm
            };

            return Ok(model); // 200
        }

        [HttpPost]
        public IActionResult Create([FromBody]CompanyArgument company)
        {
            if (company == null)
            {
                return BadRequest(ResultBase.ErrorResult("Company is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            var category = this.categoryRepository.Find(company.CategoryId);
            if (category == null)
            {
                return NotFound(); // 404
            }

            var companyData = Mapper.Map<Company>(company);

            if (!repository.Exists(companyData.Name))
            {
                repository.Add(companyData);
            }
            else
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            var result = Mapper.Map<CompanyResult>(companyData);
            result.CategoryName = category.Name;

            return CreatedAtRoute("GetCompany", new { Id = result.CompanyId }, result); // 201
        }

        [HttpGet("{id}", Name = "GetCompany")]
        public IActionResult GetCompany(int id)
        {
            var company = this.repository.Get(id);
            if (company == null)
            {
                return NotFound(); // 404
            }

            var result = new DataResult<CompanyResult>
            {
                Success = true,
                Item = Mapper.Map<CompanyResult>(company)
            };
            return Ok(result); // 200
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] CompanyArgument company)
        {
            if (company == null)
            {
                return BadRequest(ResultBase.ErrorResult("Company is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404
            }

            var companyData = Mapper.Map<Company>(company);
            companyData.CompanyId = id;

            if (repository.Exists(companyData.Name, id))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            this.repository.Update(companyData);

            return Ok(companyData);
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