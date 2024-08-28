using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class CourseService : ICourseService
    {
        private readonly CourseEnquiryDbContext _context;

        public CourseService(CourseEnquiryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course> GetCourseById(int courseId)
        {
            return await _context.Courses.FindAsync(courseId);
        }

        public async Task AddCourse(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
        }

        public async Task<string> UpdateCourse(int id, Course course)
        {
            var data = await _context.Courses.FindAsync(id);
            if (data == null) return "Course doesnot exist";
            data.CourseName = course.CourseName;
            data.Description = course.Description;
            data.Duration = course.Duration;
            data.Amount = course.Amount;
            await _context.SaveChangesAsync();
            return "Updated";
        }

        public async Task<string> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return "Not Found doesnot Exist";
            if (course != null)
            {
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
            }
            return "";
        }
        public async Task<IEnumerable<Payment>> GetAllPayments(int courseId)
        {
            var payments = await (from p in _context.Payments
                join e in _context.Enquiries on p.EnquiryID equals e.EnquiryID
                where e.CourseID == courseId
                select p)
                .ToListAsync();
            return payments;
        }

        
    }
}





