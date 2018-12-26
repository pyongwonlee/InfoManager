using InfoManager.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Contract.Books
{
    public interface IBookRepository : IRepository<Book>
    {
        IEnumerable<Book> Books { get; }
        IEnumerable<Book> GetBooksInPage(string searchTerm, int page, int pageSize);

        bool Exists(string author, string title);
    }
}
