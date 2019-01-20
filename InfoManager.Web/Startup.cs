using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using InfoManager.DataAccess;
using Microsoft.AspNetCore.Mvc.Formatters;
using InfoManager.DataAccess.Contract.Books;
using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.DataAccess.Concrete.Credentials;
using InfoManager.DataAccess.Concrete.Books;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Concrete.Movies;
using InfoManager.Web.Models;
using Microsoft.AspNetCore.Http;

namespace InfoManager.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddMvcOptions(option => 
                    {
                        option.OutputFormatters
                            .Add(new XmlDataContractSerializerOutputFormatter());
                        option.InputFormatters
                            .Add(new XmlDataContractSerializerInputFormatter(option));
                    })
                .AddJsonOptions(option =>
                    {
                        //option.SerializerSettings.PreserveReferencesHandling 
                        //    = Newtonsoft.Json.PreserveReferencesHandling.None;
                        option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });

            services.AddDbContext<InfoManagerContext>(
                options => options.UseSqlServer(
                    Configuration.GetConnectionString("InfoManagerConnection")
                )
            );

            services.Configure<ApiBehaviorOptions>(options =>
                {
                    options.SuppressModelStateInvalidFilter = true;
                });

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IDirectorRepository, DirectorRepository>();
            services.AddScoped<IBookRepository, BookRepository>();

            // IIS
            services.Configure<IISServerOptions>(options =>
            {
                options.AutomaticAuthentication = false;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("Unexpected Error happened. Try again later");
                    });
                });
            }

            DataConversion.Init();

            app.UseStatusCodePages();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
