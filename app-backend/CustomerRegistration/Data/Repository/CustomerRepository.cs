using CustomerRegistration.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerRegistration.Data.Repository
{
    public class CustomerRepository : IRepository
    {
        private readonly DataContext _context;
        public CustomerRepository(DataContext context)
        {
            _context = context;
        }

        string spCallingString = "EXEC SelectCustomers @p0";
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            
            return await _context.Customer.FromSqlRaw(spCallingString, 0).ToListAsync();
        }
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            return await _context.Customer.FromSqlRaw(spCallingString, id).FirstOrDefaultAsync();
        }

        public async Task<int> SavetCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateCustomer(int id, Customer customer)
        {
           
            _context.Entry(customer).State = EntityState.Modified;
            return await _context.SaveChangesAsync();
            
        }

        public async Task<int> DeleteCustomer(Customer customer)
        {
            _context.Customer.Remove(customer);
            return await _context.SaveChangesAsync();
        }
        
    }
}
