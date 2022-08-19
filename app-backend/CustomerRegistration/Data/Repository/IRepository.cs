using CustomerRegistration.Data.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CustomerRegistration.Data.Repository
{
    public interface IRepository
    {
        Task<ActionResult<IEnumerable<Customer>>> GetCustomers();
        Task<ActionResult<Customer>> GetCustomer(int id);
        Task<int> SavetCustomer(Customer customer);
        Task<int> UpdateCustomer(int id, Customer customer);
        Task<int> DeleteCustomer(Customer customer);
    }
}
