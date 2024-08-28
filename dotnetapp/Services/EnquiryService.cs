using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class EnquiryService : IEnquiryService
    {
        private readonly CourseEnquiryDbContext _context;

        public EnquiryService(CourseEnquiryDbContext context)
        {
            _context = context;
        }
        public async Task<List<Payment>> GetPaymentsAsync()
        {
            return await _context.Payments.ToListAsync();
        }
        public async Task<Enquiry> GetEnquiryIdAsync(int id)
        {
            return await _context.Enquiries.FindAsync(id);
        }

        public async Task<List<Enquiry>> GetEnquiryAsync()
        {
            return await _context.Enquiries.ToListAsync();
        }

        public async Task AddEnquiryAsync(Enquiry enquiry)
        {
            _context.Enquiries.Add(enquiry);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEnquiryAsync(int id, Enquiry enq)
        {
            var enquiry = await _context.Enquiries.FindAsync(id);
            if (enquiry != null)
            {
                enquiry.EnquiryDate = enq.EnquiryDate;
                //enquiry.userId = enq.userId;
                enquiry.Title = enq.Title;
                enquiry.Description = enq.Description;
                enquiry.EmailID = enq.EmailID;
                enquiry.EnquiryType = enq.EnquiryType;
                enquiry.CourseID = enq.CourseID;
                enquiry.EnquiryStatus = enq.EnquiryStatus;
                enquiry.AdminResponse = enq.AdminResponse;

                _context.Enquiries.Update(enquiry);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<string> DeleteEnquiryAsync(int id)
        {
            var enquiry = await _context.Enquiries.FindAsync(id);
            if (enquiry == null) return "404";
            if (enquiry != null)
            {
                _context.Enquiries.Remove(enquiry);
                await _context.SaveChangesAsync();
            }
            return "";
        }

        public async Task<List<Enquiry>> GetEnquiryByUserId(int id)              // this is also done above confirm this
        {
            return await _context.Enquiries.Where(e => e.userId == id).ToListAsync();
        }

        // public async Task<List<Payment>> GetPaymentsAsync()
        // {
        //     return await _context.Payments.ToListAsync();
        // }
    }
}
