using InfoManager.DataAccess.Contract;
using InfoManager.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace InfoManager.DataAccess.Concrete
{
    public class CategoryRepository : ICategoryRepository
    {
        private InfoManagerContext context;

        public CategoryRepository(InfoManagerContext ctx)
        {
            this.context = ctx;
        }

        public IEnumerable<Category> Categories => this.context.Categories
            .Include(c => c.Companies)
            .OrderBy(c => c.Name);

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

        public int Add(Category category)
        {
            this.context.Categories.Add(category);
            this.context.SaveChanges();

            return category.CategoryId;
        }

        public void Update(Category category)
        {
            this.context.Entry(category).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            var category = Find(id);
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
