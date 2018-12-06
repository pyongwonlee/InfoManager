using InfoManager.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace InfoManager.DataAccess.Contract
{
    public interface IBookRepository : IDisposable
    {
        IEnumerable<Book> Books { get; }
        IEnumerable<Book> GetBooksInPage(string searchTerm, int page, int pageSize);

        int TotalCount { get; }
        Book Find(int id);
        bool Exists(string author, string title);

        int Add(Book book);
        void Update(Book book);
        void Delete(int id);
    }
}
