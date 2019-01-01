using AutoMapper;
using InfoManager.DataAccess.Contract.Books;
using InfoManager.DataAccess.Models;
using InfoManager.Web.Models;
using InfoManager.Web.Models.Books;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace InfoManager.Web.Controllers
{
    [ApiController]
    [Route("api/books")]
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
        public IActionResult Create([FromBody]BookArgument book)
        {
            if (book == null)
            {
                return BadRequest(ResultBase.ErrorResult("Book is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            var bookData = Mapper.Map<Book>(book);
            if (repository.Exists(bookData.Author, bookData.Title))
            {
                return new StatusCodeResult(StatusCodes.Status409Conflict); // 409: already exists
            }

            repository.Add(bookData);
            var result = Mapper.Map<BookResult>(bookData);

            return CreatedAtRoute("GetBook", new { Id = result.BookId }, result); // 201
        }

        [HttpGet("{id}", Name = "GetBook")]
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

        [HttpPut("{id}")]
        public IActionResult Edit(int id, [FromBody] BookArgument book)
        {
            if (book == null)
            {
                return BadRequest(ResultBase.ErrorResult("Book is null")); // 400
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ResultBase.ErrorResult(ModelState));  // 400
            }

            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404
            }

            var bookData = Mapper.Map<Book>(book);
            bookData.BookId = id;
            this.repository.Update(bookData);

            return Ok(bookData);
        }

        [HttpGet("delete")]
        public IActionResult Delete(int id)
        {
            var book = this.repository.Find(id);
            if (book == null)
            {
                return NotFound(); // 404
            }

            return Ok(book);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfirm(int id)
        {
            if (this.repository.Find(id) == null)
            {
                return NotFound(); // 404              
            }

            this.repository.Delete(id);

            return NoContent(); // 204
        }
    }
}