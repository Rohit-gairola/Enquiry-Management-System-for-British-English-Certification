using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IEnquiryService
    {
        Task<Enquiry> GetEnquiryIdAsync(int id);
        Task<List<Enquiry>> GetEnquiryAsync();
        Task AddEnquiryAsync(Enquiry enquiry);
        Task UpdateEnquiryAsync(int id, Enquiry enq);
        Task<string> DeleteEnquiryAsync(int id);
        Task<List<Enquiry>> GetEnquiryByUserId(int userid);
        Task<List<Payment>> GetPaymentsAsync();
    }
}
