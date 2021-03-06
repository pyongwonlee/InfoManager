﻿using InfoManager.DataAccess.Models;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Contract.Credentials
{
    public interface ICategoryRepository : IRepository<Category>
    {
        IEnumerable<Category> Categories { get; }
        IEnumerable<Category> CategoryNames { get; }

        int GetCategoryId(string name);

        bool Exists(string name);
        bool Exists(string name, int ownId);
    }
}
