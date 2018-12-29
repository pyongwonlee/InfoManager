using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.DataAccess.Concrete.Credentials
{
    public class CompanyRepository : ICompanyRepository
    {
        private InfoManagerContext context;

        public CompanyRepository(InfoManagerContext ctx)
        {
            this.context = ctx;
        }

        public IEnumerable<Category> Categories => this.context.Categories
            .OrderBy(c => c.Name);

        public IEnumerable<Company> Companies => this.context.Companies
            .Include(c => c.Category)
            .OrderBy(c => c.Name);

        public int TotalCount => this.context.Companies.Count();
 
        public Company Find(int id) => context.Companies.Find(id);

        public Company Get(int id)
        {
            return this.context.Companies
                .Include(c => c.Category)
                .Where(c => c.CompanyId == id)
                .SingleOrDefault();
        }

        public IEnumerable<Company> GetCompaniesByCategory(int categoryId)
        {
            if (categoryId < 0)
            {
                throw new ArgumentException("Invalid category id");
            }

            return this.context.Companies
                .Where(c => c.CategoryId == categoryId)
                .Include(c => c.Category)
                .OrderBy(c => c.Name);
        }
        
        public IEnumerable<Company> GetCompaniesInPage(string searchTerm, int page, int pageSize)
        {
            if (page < 0 || pageSize < 0)
            {
                throw new ArgumentException("Invalid page number or page size");
            }

            return this.context.Companies
                .Where(c =>
                    string.IsNullOrEmpty(searchTerm) ||
                    c.Name.ToLower().Contains(searchTerm.ToLower()))
                .Include(c => c.Category)
                .OrderBy(c => c.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public bool Exists(string name) => this.context.Companies
            .Where(d => d.Name == name).Any();

        public bool Exists(int id) =>
            this.context.Companies.Find(id) != null;

        public int Add(Company company)
        {
            this.context.Companies.Add(company);
            this.context.SaveChanges();

            return company.CompanyId;
        }

        public void Update(Company company)
        {
            if (!this.Exists(company.CompanyId))
            {
                throw new ArgumentException($"Company with Id({company.CompanyId}) does not exist");
            }

            this.context.Entry(company).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            var company = Find(id);
            if (company == null)
            {
                throw new ArgumentException($"Company with Id({id}) does not exist");
            }

            this.context.Companies.Remove(company);
            this.context.SaveChanges();
        }

        public void Dispose()
        {
            if (this.context != null)
            {
                this.context.Dispose();
                this.context = null;
            }
        }
    }
}
