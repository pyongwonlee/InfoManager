using System;

namespace InfoManager.DataAccess.Contract
{
    public interface IRepository<T> : IDisposable
    {
        int TotalCount { get; }
        T Find(int id);
        T Get(int id);
        bool Exists(int id);

        int Add(T item);
        void Update(T item);
        void Delete(int id);
    }
}
