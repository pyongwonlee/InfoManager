using InfoManager.DataAccess.Models;

namespace InfoManager.Web.Models
{
    public static class DataConversion
    {
        public static Book ToBoook(this BookArgument arg)
        {
            return new Book
            {
                BookId = arg.BookId,
                Author = arg.Author?.Trim(),
                Title = arg.Title?.Trim(),
                Year = arg.Year,
                Publisher = arg.Publisher?.Trim(),
                Location = arg.Location?.Trim(),
                Isbn = arg.Isbn?.Trim()
            };
        }

        public static Director ToDirector(this DirectorArgument arg)
        {
            return new Director
            {
                Id = arg.Id,
                Name = arg.Name?.Trim()
            };
        }
    }
}
