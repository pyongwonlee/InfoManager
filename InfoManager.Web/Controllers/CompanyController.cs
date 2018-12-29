using AutoMapper;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Credentials;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ICompanyRepository repository;
        private const int PAGE_SIZE = 50;

        public CompanyController(ICompanyRepository repo)
        {
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

        [HttpGet("{id}")]
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
    }
}