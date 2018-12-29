namespace InfoManager.Web.Models.Movies
{
    public class DirectorResult
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Movie[] Movies { get; set; }

        public class Movie
        {
            public int Id { get; set; }
            public string Title { get; set; }
        }
    }
}
