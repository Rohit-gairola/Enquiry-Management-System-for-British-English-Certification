using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IUserService
    {
        Task<string> UpdateStudentAsync(long id, Student enq);
        Task<string> DeleteStudentAsync(long id);
        Task AddStudentPaymentAsync(Payment payment);
        Task<IEnumerable<User>> GetStudentAsync();
        Task AddStudentAsync(Student user);
        Task AddCourseStudentAsync(Payment payment);
        Task<User> GetStudentByUserIdAsync(long userid);
        Task<List<Student>> GetEnquiryAsync();

        Task<List<Student>> GetEnquiryByEnquiryIdAsync(long EnquiryID);

        Task<IEnumerable<Student>> GetCoursesAsync();

        Task<List<Course>> GetCourseByCourseIdAsync(long id);

    }
}