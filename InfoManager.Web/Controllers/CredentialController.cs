using AutoMapper;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.Web.Helpers;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Credentials;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    [ValidationHandle]
    public class CredentialController : ControllerBase
    {
        private ICategoryRepository categoryRepository;
        private ICompanyRepository companyRepository;

        public CredentialController(ICategoryRepository categoryRepo, ICompanyRepository companyRepo)
        {
            this.categoryRepository = categoryRepo;
            this.companyRepository = companyRepo;
        }

        [HttpGet("api/categories/{categoryId}/companies")]
        public ActionResult GetCompaniesForCategory(int categoryId)
        {
            var category = this.categoryRepository.Find(categoryId);
            if (category == null)
            {
                return NotFound(); // 404
            }

            var companies = Mapper.Map<IEnumerable<CompanyResult>>(this.companyRepository.GetCompaniesByCategory(categoryId))
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
    }
}