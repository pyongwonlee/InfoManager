using InfoManager.DataAccess.Contract;
using InfoManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.DataAccess.Concrete
{
    public class BookRepository : IBookRepository
    {
        private InfoManagerContext context;

        public BookRepository(InfoManagerContext ctx)
        {
            this.context = ctx;
        }

        public IEnumerable<Book> Books => this.context.Books
            .OrderBy(b => b.Author);

        public int TotalCount => this.context.Books.Count();

        public IEnumerable<Book> GetBooksInPage(string searchTerm, int page, int pageSize)
        {
            return this.context.Books
                .Where(b =>
                    string.IsNullOrEmpty(searchTerm) ||
                    b.Author.ToLower().Contains(searchTerm.ToLower()) ||
                    b.Title.ToLower().Contains(searchTerm.ToLower()) ||
                    b.Year.ToString().Contains(searchTerm))
                .OrderBy(b => b.Author)
                .Skip((page-1)*pageSize)
                .Take(pageSize);
        }

        public bool Exists(string author, string title) =>
            this.context.Books
                .Where(b => b.Author == author && b.Title == title).Any();

        public Book Find(int id) => this.context.Books.Find(id);

        public int Add(Book book)
        {
            this.context.Books.Add(book);
            this.context.SaveChanges();

            return book.BookId;
        }

        public void Update(Book book)
        {
            this.context.Entry(book).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            var book = this.Find(id);
            this.context.Books.Remove(book);
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
