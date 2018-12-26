using InfoManager.DataAccess.Models;
using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using InfoManager.DataAccess.Contract.Movies;
using InfoManager.DataAccess.Contract;

namespace InfoManager.DataAccess.Concrete.Movies
{
    public class DirectorRepository : IDirectorRepository
    {
        private InfoManagerContext context;

        public DirectorRepository(InfoManagerContext ctx)
        {
            this.context = ctx;
        }

        public IEnumerable<Director> Directors => this.context.Directors
            .OrderBy(b => b.Name);

        public int TotalCount => this.context.Directors.Count();

        public IEnumerable<Director> GetDirectorsInPage(string searchTerm, int page, int pageSize)
        {
            if (page < 0 || pageSize < 0)
            {
                throw new ArgumentException("Invalid page number or page size");
            }

            return this.context.Directors
                .Where(d =>
                    string.IsNullOrEmpty(searchTerm) ||
                    d.Name.ToLower().Contains(searchTerm.ToLower()))
                .Include(d => d.Movies)
                .OrderBy(d => d.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
        }

        public bool Exists(string name) => 
            this.context.Directors
                .Where(d => d.Name == name).Any();

        public bool Exists(string name, int currentId) =>
            this.context.Directors
                .Where(d => d.Name == name && d.Id != currentId).Any();

        public bool Exists(int id) =>
            this.context.Directors.Find(id) != null;

        public Director Find(int id) => this.context.Directors.Find(id);

        public int Add(Director director)
        {
            this.context.Directors.Add(director);
            this.context.SaveChanges();

            return director.Id;
        }

        public void Update(Director director)
        {
            if (!this.Exists(director.Id))
            {
                throw new ArgumentException($"Director with Id({director.Id}) does not exist");
            }

            this.context.Entry(director).State = EntityState.Modified;
            this.context.SaveChanges();
        }

        public void Delete(int id)
        {
            var director = this.Find(id);
            if (director == null)
            {
                throw new ArgumentException($"Director with Id({id}) does not exist");
            }

            this.context.Directors.Remove(director);
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
