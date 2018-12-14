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
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryRepository repository;

        public CategoryController(ICategoryRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet]
        [Route("")]
        public ActionResult Index()
        {
            var model = new DataIndexResult<CategoryResult>
            {
                Success = true,
                Items = this.repository.Categories
                    .Select(c => new CategoryResult
                    {
                        CategoryId = c.CategoryId,
                        Name = c.Name,
                        Companies = c.Companies
                            .Select(company => new CategoryResult.Company
                            {
                                CompanyId = company.CompanyId,
                                Name = company.Name
                            })
                            .ToArray()
                    })
                    .ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = ""
            };

            return Ok(model);
        }
    }
}