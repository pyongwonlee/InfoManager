using System;
using InfoManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace InfoManager.DataAccess
{
    public partial class InfoManagerContext : DbContext
    {
        public InfoManagerContext(DbContextOptions<InfoManagerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Books { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Center> Centers { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Director> Directors { get; set; }
        public virtual DbSet<Movie> Movies { get; set; }
        public virtual DbSet<Password> Passwords { get; set; }
        public virtual DbSet<Preference> Preferences { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }        

        /* How to migrate DB
         * Scaffold-DbContext -provider Microsoft.EntityFrameworkCore.SqlServer -connection "Server=.\SQLExpress; Database=PasswordsTest;Trusted_Connection=True;"
         * Add-Migration <name>
         * Update-Database
         */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(e => e.BookId);

                entity.Property(e => e.Author)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Isbn)
                    .HasColumnName("ISBN")
                    .HasMaxLength(50);

                entity.Property(e => e.Location).HasMaxLength(250);

                entity.Property(e => e.Publisher).HasMaxLength(250);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CategoryId);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Center>(entity =>
            {
                entity.HasIndex(e => e.CityId)
                    .HasName("IX_CityId");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.WebAddress).HasMaxLength(250);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Centers)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("FK_dbo.Centers_dbo.Cities_CityId");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.HasIndex(e => e.ProvinceId)
                    .HasName("IX_ProvinceId");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.ProvinceId)
                    .HasConstraintName("FK_dbo.Cities_dbo.Provinces_ProvinceId");
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.CompanyId);

                entity.HasIndex(e => e.CategoryId)
                    .HasName("IX_CategoryId");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.WebAddress).HasMaxLength(250);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Companies)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_dbo.Companies_dbo.Categories_CategoryId");
            });

            modelBuilder.Entity<Director>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.HasIndex(e => e.DirectorId)
                    .HasName("IX_DirectorId");

                entity.Property(e => e.Imdbrating).HasColumnName("IMDBRating");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.Director)
                    .WithMany(p => p.Movies)
                    .HasForeignKey(d => d.DirectorId)
                    .HasConstraintName("FK_dbo.Movies_dbo.Directors_DirectorId");
            });

            modelBuilder.Entity<Password>(entity =>
            {
                entity.HasKey(e => e.PasswordId);

                entity.HasIndex(e => e.CompanyId)
                    .HasName("IX_CompanyId");

                entity.Property(e => e.Comment).HasMaxLength(250);

                entity.Property(e => e.PasswordCode)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Passwords)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_dbo.Passwords_dbo.Companies_CompanyId");
            });

            modelBuilder.Entity<Preference>(entity =>
            {
                entity.HasKey(e => e.Key);

                entity.Property(e => e.Key)
                    .HasMaxLength(100)
                    .ValueGeneratedNever();
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.Property(e => e.Abbreviation)
                    .IsRequired()
                    .HasMaxLength(5);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });
        }
    }
}
