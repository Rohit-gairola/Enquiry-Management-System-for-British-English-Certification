using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
public class Course
{
    [Key]
    public int CourseID { get; set; }
 
    [Required(ErrorMessage = "The course name is required")]
    public string? CourseName { get; set; }
 
    [StringLength(100, MinimumLength = 10, ErrorMessage = "The description must be between 10 and 100 characters")]
    public string? Description { get; set; }
 
    [Required(ErrorMessage = "The duration is required")]
    public string? Duration { get; set; }
 
   [System.ComponentModel.DataAnnotations.Range(0, int.MaxValue, ErrorMessage = "The amount must be a positive number")]
    public int Amount { get; set; }
 
    public HashSet<Student>? Students { get; set; }
    public List<Enquiry>? Enquiries { get; set; }
}
}