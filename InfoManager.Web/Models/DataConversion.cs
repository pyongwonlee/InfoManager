using InfoManager.DataAccess.Models;
using InfoManager.Web.Models.Books;
using InfoManager.Web.Models.Credentials;
using InfoManager.Web.Models.Movies;

namespace InfoManager.Web.Models
{
    public static class DataConversion
    {
        public static void Init()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<string, string>()
                    .ConvertUsing(str => !string.IsNullOrEmpty(str) ? str.Trim() : null);

                // Books
                cfg.CreateMap<BookArgument, Book>();
                cfg.CreateMap<Book, BookResult>();

                // Movies
                cfg.CreateMap<DirectorArgument, Director>();
                cfg.CreateMap<Movie, DirectorResult.Movie>();
                cfg.CreateMap<Director, DirectorResult>();

                // Credentials
                cfg.CreateMap<Company, CategoryResult.Company>();
                cfg.CreateMap<Category, CategoryResult>();

                cfg.CreateMap<Company, CompanyResult>()
                    .ForMember(
                        dest => dest.CategoryName,
                        opts => opts.MapFrom(src => src.Category.Name)
                    );
            });
        }
    }
}
