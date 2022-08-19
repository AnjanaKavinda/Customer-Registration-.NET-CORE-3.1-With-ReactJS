using System.ComponentModel.DataAnnotations;

namespace CustomerRegistration.Data.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int PhoneNo { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Email { get; set; }

    }
}
