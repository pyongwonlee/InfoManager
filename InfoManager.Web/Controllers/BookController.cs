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
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private IBookRepository repository;
        private const int PAGE_SIZE = 50;

        public BookController(IBookRepository repo)
        {
            this.repository = repo;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index(int page = 1, string searchTerm = "")
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "" : searchTerm.Trim();

            var model = new DataIndexResult<Book>
            {
                Success = true,
                Items = this.repository.GetBooksInPage(searchTerm, page, PAGE_SIZE).ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm                
            };

            return Ok(model);
        }

        [HttpGet]
        [Route("refresh")]
        public IActionResult Refresh()
        {
            int page = 1;
            string searchTerm = string.Empty;
            return Index(page, searchTerm);
        }

        [HttpGet]
        [Route("search")]
        public IActionResult Search(string searchTerm = "")
        {
            int page = 1;
            return Index(page, searchTerm);
        }

        [HttpGet]
        [Route("create")]
        public IActionResult Create()
        {
            var model = new BookResult
            {
                Success = true,
                Book = new Book() { Year = 2000 }
            };
            return Ok(model);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody]BookArgument book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            var bookData = book.ToBoook();
            if (!repository.Exists(bookData.Author, bookData.Title))
            {
                repository.Add(bookData);
            }
            else
            {
                // TODO: Add Error
            }
            return Ok(bookData);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Edit(int id)
        {
            var book = this.repository.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            var result = new BookResult
            {
                Success = true,
                Book = book
            };
            return Ok(result);
        }

        [HttpPut]
        [Route("edit")]
        public IActionResult Edit([FromBody] BookArgument book)
        {
            if (book == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (this.repository.Find(book.BookId) == null)
            {
                // TODO: Add Error
            }

            var bookData = book.ToBoook();
            this.repository.Update(bookData);

            return Ok(bookData);
        }

        [HttpGet]
        [Route("delete")]
        public IActionResult Delete(int id)
        {
            var book = this.repository.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpDelete]
        [Route("")]
        public IActionResult DeleteConfirm(int id)
        {
            if (this.repository.Find(id) == null)
            {
                // TODO: Add Error                
            }

            this.repository.Delete(id);
            var result = new ResultBase
            {
                Success = true
            };
            return Ok(result);
        }
    }
}