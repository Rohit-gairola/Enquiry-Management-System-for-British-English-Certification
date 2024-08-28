using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class ResponseModel
    {
        public long UserId { get; set; }
 
        public string? Username { get; set; }
        public string? emailID { get; set; }
 
        public string? UserRole { get; set; }
 
        public string Token { get; set; }
    }
}