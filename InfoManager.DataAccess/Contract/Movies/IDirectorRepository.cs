using InfoManager.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Contract.Movies
{
    public interface IDirectorRepository : IRepository<Director>
    {
        IEnumerable<Director> Directors { get; }
        IEnumerable<Director> GetDirectorsInPage(string searchTerm, int page, int pageSize);

        bool Exists(string name);
        bool Exists(string name, int currentId);
    }
}
