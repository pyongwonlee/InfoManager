using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InfoManager.DataAccess.Contract;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InfoManager.Web.Controllers
{
    [Route("api/company")]
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
        [Route("")]
        public ActionResult Index(int page = 1)
        {
            string searchTerm = string.Empty;

            var model = new DataIndexResult<Company>
            {
                Success = true,
                Items = this.repository.GetCompaniesInPage(searchTerm, page, PAGE_SIZE).ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm
            };

            return Ok(model);
        }
    }
}