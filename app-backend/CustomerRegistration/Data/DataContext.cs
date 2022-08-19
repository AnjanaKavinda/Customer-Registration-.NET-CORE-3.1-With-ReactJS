using Microsoft.EntityFrameworkCore;
using CustomerRegistration.Data.Models;

namespace CustomerRegistration.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customer { get; set; }
    }
}
