using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models{
public class Payment
{
    public int PaymentID { get; set; }
 
    [Required(ErrorMessage = "The enquiry ID is required")]
    public int EnquiryID { get; set; }
 
    [Required(ErrorMessage = "The user ID is required")]
    public int userId { get; set; }
 
    [Required(ErrorMessage = "The amount paid is required")]
    [System.ComponentModel.DataAnnotations.Range(0, int.MaxValue, ErrorMessage = "The amount must be a positive number")]
    public int amountPaid { get; set; }
 
    [Required(ErrorMessage = "The payment date is required")]
    public DateTime paymentDate { get; set; }
 
    [Required(ErrorMessage = "The mode of payment is required")]
    public string? modeOfPayment { get; set; }
 
    public Student? Student { get; set; }
}
}