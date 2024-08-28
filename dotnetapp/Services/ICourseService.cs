using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
 
namespace dotnetapp.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetAllCourses();
        Task<Course> GetCourseById(int courseId);
        Task AddCourse(Course course);
        Task<string> UpdateCourse(int id, Course course);
        Task<string> DeleteCourse(int id);
        Task<IEnumerable<Payment>> GetAllPayments(int courseId);
      
    }
}