namespace InfoManager.Web.Models.Credentials
{
    public class CategoryResult
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public Company[] Companies { get; set; }

        public class Company
        {
            public int CompanyId { get; set; }
            public string Name { get; set; }
            public string WebAddress { get; set; }
        }
    }
}
