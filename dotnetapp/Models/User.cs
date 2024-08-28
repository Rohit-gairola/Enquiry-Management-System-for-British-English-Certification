using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
public class UserClone
{
    [Key]
    public int userId { get; set; }
 
    // [Required(ErrorMessage = "The username is required")]
    public string userName { get; set; }
 
    [Required]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string emailID { get; set; }
 
    [Required(ErrorMessage = "The password is required")]
    [MinLength(6, ErrorMessage = "The password must be at least 6 characters")]
    public string password { get; set; }
 
    // [Required(ErrorMessage = "The mobile number is required")]
    //[RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Invalid mobile number")]
    public long? mobileNumber { get; set; }
 
    // [Required(ErrorMessage = "The user role is required")]
    public string userRole { get; set; }
}

public class User
{
    [Key]
    public int userId { get; set; }
 
    // [Required(ErrorMessage = "The username is required")]
    public string UserName { get; set; }
 
    // [Required]
    //[EmailAddress(ErrorMessage = "Invalid email address")]
    public string? EmailID { get; set; }
 
    [Required(ErrorMessage = "The password is required")]
    [MinLength(6, ErrorMessage = "The password must be at least 6 characters")]
    public string password { get; set; }
 
    // [Required(ErrorMessage = "The mobile number is required")]
    //[RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Invalid mobile number")]
    public long? mobileNumber { get; set; }
 
    // [Required(ErrorMessage = "The user role is required")]
    public string userRole { get; set; }
}



// public class User
// {
//     [Key]
//     public int userId { get; set; }
 
//     // [Required(ErrorMessage = "The username is required")]
//     public string UserName { get; set; }
 
//     [Required]
//     [EmailAddress(ErrorMessage = "Invalid email address")]
//     public string EmailID { get; set; }
 
//     [Required(ErrorMessage = "The password is required")]
//     [MinLength(6, ErrorMessage = "The password must be at least 6 characters")]
//     public string password { get; set; }
 
//     // [Required(ErrorMessage = "The mobile number is required")]
//     //[RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Invalid mobile number")]
//     public long? MobileNumber { get; set; }
 
//     // [Required(ErrorMessage = "The user role is required")]
//     public string UserRole { get; set; }
}
