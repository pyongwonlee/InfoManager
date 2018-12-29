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

        [HttpGet("api/companies")]
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

        [HttpGet("api/categories/{categoryId}/companies")]
        public ActionResult GetCompaniesForCategory(int categoryId)
        {
            var category = this.categoryRepository.Find(categoryId);
            if (category == null)
            {
                return NotFound(); // 404
            }

            var companies = Mapper.Map<IEnumerable<CompanyResult>>(this.repository.GetCompaniesByCategory(categoryId))
                    .ToArray();

            var model = new ListResult<CompanyResult>
            {
                Success = true,
                Items = companies,
                TotalCount = companies.Length,
                SearchString = string.Empty
            };

            return Ok(model); // 200
        }

        [HttpGet("api/companies/create")]
        public IActionResult Create()
        {
            var model = new DataResult<CompanyResult>
            {
                Success = true,
                Item = new CompanyResult()
                {
                    Name = string.Empty,
                    CategoryName = string.Empty
                }
            };
            return Ok(model);
        }

        [HttpPost("api/companies")]
        public IActionResult Create([FromBody]CompanyArgument company)
        {
            if (company == null)
            {
                return BadRequest(); // 400
            }

            var category = this.categoryRepository.Find(company.CategoryId);
            if (category == null)
            {
                return NotFound(); // 404
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // 400
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

        [HttpGet("api/companies/{id}", Name = "GetCompany")]
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

        [HttpPut("api/companies")]
        public IActionResult Edit([FromBody] CompanyArgument company)
        {
            if (company == null)
            {
                return BadRequest(); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);  // 400
            }

            if (this.repository.Find(company.CompanyId) == null)
            {
                return NotFound(); // 404
            }

            var companyData = Mapper.Map<Company>(company);
            this.repository.Update(companyData);

            return Ok(companyData);
        }

        [HttpGet("api/companies/delete")]
        public IActionResult Delete(int id)
        {
            var category = this.repository.Find(id);
            if (category == null)
            {
                return NotFound(); // 404
            }

            return Ok(category);
        }

        [HttpDelete("api/companies")]
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