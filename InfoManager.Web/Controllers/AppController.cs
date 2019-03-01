using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace InfoManager.Web.Controllers
{
    [Route("api/app")]
    [ApiController]
    public class AppController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public AppController(IConfiguration config)
        {
            this.Configuration = config;
        }

        [HttpGet("info")]
        public IActionResult Info()
        {
            var version 
                = this.Configuration.GetSection("Information").GetValue<string>("Version");

            return Ok(new { Version = version });
        }
    }
}