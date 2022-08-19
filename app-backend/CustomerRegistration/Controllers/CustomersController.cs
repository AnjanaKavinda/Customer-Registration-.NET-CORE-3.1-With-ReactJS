using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CustomerRegistration.Data;
using CustomerRegistration.Data.Models;
using CustomerRegistration.Data.Repository;

namespace CustomerRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IRepository _repository;

        public CustomersController(DataContext context, IRepository repository)
        {
            _context = context;
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try
            {
                return await _repository.GetCustomers();
            }
            catch (Exception)
            {

                return BadRequest();
            }
           
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _repository.GetCustomer(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }


            try
            {
                await _repository.UpdateCustomer(id, customer);
                return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            try
            {
                await _repository.SavetCustomer(customer);

                var stu = CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);

                return stu;
            }
            catch (Exception)
            {

                return BadRequest();
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            try
            {
                await _repository.DeleteCustomer(customer);
                return Ok();
            }
            catch (Exception)
            {

                return BadRequest();
            }
            

            
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
