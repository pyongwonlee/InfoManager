using AutoMapper;
using InfoManager.DataAccess.Contract.Books;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Books;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [Route("api/books")]
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
        public IActionResult GetBooks(int page = 1, string searchTerm = "")
        {
            searchTerm = string.IsNullOrEmpty(searchTerm) ? "" : searchTerm.Trim();

            var model = new ListResult<Book>
            {
                Success = true,
                Items = this.repository.GetBooksInPage(searchTerm, page, PAGE_SIZE).ToArray(),
                TotalCount = this.repository.TotalCount,
                SearchString = searchTerm                
            };

            return Ok(model); // 200
        }

        [HttpGet("refresh")]
        public IActionResult Refresh()
        {
            int page = 1;
            string searchTerm = string.Empty;
            return GetBooks(page, searchTerm);
        }

        [HttpGet("search")]
        public IActionResult Search(string searchTerm = "")
        {
            int page = 1;
            return GetBooks(page, searchTerm);
        }

        [HttpGet("create")]
        public IActionResult Create()
        {
            var model = new DataResult<BookResult>
            {
                Success = true,
                Item = new BookResult() { Year = 2000 }
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

            var bookData = Mapper.Map<Book>(book);
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

        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book = this.repository.Find(id);
            if (book == null)
            {
                return NotFound(); // 404
            }

            var result = new DataResult<BookResult>
            {
                Success = true,
                Item = Mapper.Map<BookResult>(book)
            };
            return Ok(result); // 200
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

            var bookData = Mapper.Map<Book>(book);
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
                return NotFound(); // 404
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