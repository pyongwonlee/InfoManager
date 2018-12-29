namespace InfoManager.Web.Models.Credentials
{
    public class CompanyResult
    {
        public int CompanyId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string WebAddress { get; set; }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
