﻿using InfoManager.DataAccess.Models;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Contract
{
    public interface ICompanyRepository : IRepository<Company>
    {
        IEnumerable<Category> Categories { get; }

        IEnumerable<Company> Companies { get; }
        IEnumerable<Company> GetCompaniesByCategory(int categoryId);
        IEnumerable<Company> GetCompaniesInPage(string searchTerm, int page, int pageSize);

        bool Exists(string name);
    }
}
