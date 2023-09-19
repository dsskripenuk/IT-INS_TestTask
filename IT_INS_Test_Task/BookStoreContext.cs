using IT_INS_Test_Task.Models;
using Microsoft.EntityFrameworkCore;

namespace IT_INS_Test_Task
{
    public class BookStoreContext : DbContext
    {
        public BookStoreContext(DbContextOptions<BookStoreContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}
