using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace dotnetapp.Models
{
    public class CourseEnquiryDbContext:DbContext
    {
        public CourseEnquiryDbContext(){}
        public CourseEnquiryDbContext(DbContextOptions<CourseEnquiryDbContext> options):base(options)
        {
          
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
              if(!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("user id=sa;password=examlyMssql@123;server=localhost;Database=EnquiryDbb;trusted_connection=false;Persist Security Info=False;Encrypt=False");
            }
        }

        public DbSet <Course> Courses{get;set;}
        public DbSet <Enquiry> Enquiries{get;set;}
        public DbSet <Payment> Payments{get;set;}
        public DbSet <Student> Students{get;set;}
        public DbSet <User> Users{get;set;} 
        public DbSet <CourseStudent> CourseStudents{get;set;}
        
    }
}
