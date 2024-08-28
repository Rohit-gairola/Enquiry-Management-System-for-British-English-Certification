using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class Student
    {
        [Key]
        public long StudentId { get; set; }

        [Required(ErrorMessage = "The Student name is required")]
        public string? StudentName { get; set; }

        [Required(ErrorMessage = "The Student mobile number is required")]
        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Invalid mobile number")]
        public string? StudentMobileNumber { get; set; }
        public List<Enquiry>? Enquiries { get; set; }
        public List<Course>? Courses { get; set; }
        public HashSet<Payment>? Payments { get; set; }
        public int? EnquiryCount { get; set; }
        public User? User { get; set; }
    }
}