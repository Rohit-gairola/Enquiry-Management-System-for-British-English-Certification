using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
public class Enquiry
{
    [Key]
    public int EnquiryID { get; set; }
 
    [Required(ErrorMessage = "The enquiry date is required")]
    public DateTime EnquiryDate { get; set; }
 
    [Required(ErrorMessage = "The user ID is required")]
    public int userId { get; set; }
 
    [Required(ErrorMessage = "The title is required")]
    public string? Title { get; set; }
 
    [Required(ErrorMessage = "The description is required")]
    public string? Description { get; set; }
 
    [Required(ErrorMessage = "The email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string? EmailID { get; set; }
 
    [Required(ErrorMessage = "The enquiry type is required")]
    public string? EnquiryType { get; set; }
 
    public int CourseID { get; set; }

    [StringLength(20, ErrorMessage = "Enquiry Status should be of atmax length 20")]
    public string? EnquiryStatus{get;set;}

    [StringLength(50, ErrorMessage="Admin Response should be of atmax length 50")]
    public string? AdminResponse{get;set;}
}
}