using InfoManager.DataAccess.Contract.Credentials;
using InfoManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.DataAccess.Concrete.Credentials
{
    public class CategoryRepository : ICategoryRepository
    {
        private InfoManagerContext context;

        public CategoryRepository(InfoManagerContext ctx)
        {
            this.context = ctx;
        }

        public IEnumerable<Category> Categories
        {
            get
            {
                var categories = this.context.Categories
                    .Include(c => c.Companies)
                    .OrderBy(c => c.Name);
                
                foreach(var category in categories)
                {
                    category.Companies = category.Companies.OrderBy(c => c.Name).ToArray();
                }

                return categories;
            }
        }

        public int TotalCount => this.context.Categories.Count();

        public IEnumerable<Category> CategoryNames
        {
            get
            {
                var categories =
                    this.context.Categories
                        .OrderBy(c => c.Name)
                        .ToList();
                categories.Insert(0, new Category { CategoryId = 0, Name = "All" });
                return categories;
            }
        }

        public Category Find(int id) => this.context.Categories.Find(id);

        public Category Get(int id)
        {
            return this.context.Categories
                .Include(c => c.Companies)
                .Where(c => c.CategoryId == id)
                .SingleOrDefault();
        }

        public int GetCategoryId(string name)
        {
            int categoryId = 0;
            if (!string.IsNullOrEmpty(name) && name != "All")
            {
                var category = this.context.Categories
                     .Where(c => c.Name == name)
                     .FirstOrDefault();

                if (category != null)
                {
                    categoryId = category.CategoryId;
                }
            }

            return categoryId;
        }

        public bool Exists(string name) => this.context.Categories
            .Where(d => d.Name == name).Any();

        public bool Exists(string name, int ownId) => this.context.Categories
            .Where(d => d.Name == name && d.CategoryId != ownId).Any();

        public bool Exists(int id) =>
            this.context.Categories.Find(id) != null;

        public int Add(Category category)
        {
            this.context.Categories.Add(category);
            this.context.SaveChanges();

            return category.CategoryId;
        }

        public void Update(Category categoryData)
        {
            var category = Find(categoryData.CategoryId);
            if (category == null)
            {                
                throw new ArgumentException($"Category with Id({categoryData.CategoryId}) does not exist");
            }

            category.Name = categoryData.Name;
            this.context.Entry(category).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category = Find(id);
            if (category == null)
            {
                throw new ArgumentException($"Category with Id({id}) does not exist");
            }

            this.context.Categories.Remove(category);
            this.context.SaveChanges();
        }

        public void Dispose()
        {
            if (this.context != null)
            {
                this.context.Dispose();
                this.context = null;
            }
        }
    }
}
