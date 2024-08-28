using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ErrorLogs
    {
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string ErrorMessage { get; set; }
    }
}