using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class UserService : IUserService
    {
        private readonly CourseEnquiryDbContext _dbContext;

        public UserService(CourseEnquiryDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> UpdateStudentAsync(long id, Student student)
        {
            var existingStudent = await _dbContext.Students.FindAsync(id);
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.userId == id);

            if (existingStudent != null)
            {
                existingStudent.StudentName = student.StudentName;
                existingStudent.StudentMobileNumber = student.StudentMobileNumber;

                existingUser.UserName = student.StudentName;
                existingUser.EmailID = student.User.EmailID;
                existingUser.password = student.User.password;
                existingUser.mobileNumber = Int64.Parse(student.StudentMobileNumber);
               //existingUser.MobileNumber = Int64.Parse(student.StudentMobileNumber);

                await _dbContext.SaveChangesAsync();
                return "Ok";
            }
            return "BadRequest";
        }

        public async Task<string> DeleteStudentAsync(long id)
        {
            var studentToDelete = await _dbContext.Students.FindAsync(id);
            var existingUserToDelete = await _dbContext.Users.FirstOrDefaultAsync(u => u.userId == id);
            if (studentToDelete != null)
            {
                _dbContext.Students.Remove(studentToDelete);
                _dbContext.Users.Remove(existingUserToDelete);
                await _dbContext.SaveChangesAsync();
                return "Ok";
            }
            return "BadRequest";
        }

        public async Task AddStudentPaymentAsync(Payment payment)
        {
            var student = await _dbContext.Students.Include(s => s.Payments).FirstOrDefaultAsync();

            if (student != null)
            {
                student.Payments.Add(payment);
                await _dbContext.SaveChangesAsync();
            }


        }
        public async Task AddCourseStudentAsync(Payment payment)
        {
            // courseId comes from enquiry id and StudentID coming from payment body
            // var course = _context.Payments.Include("Enquiries").Where(e=> e.enquiryID == payment.enquiryID  ).FirstOrDefaultAsync();
            var enquiry = await _dbContext.Enquiries.FindAsync(payment.EnquiryID);
            var newCourseId = enquiry.CourseID;
            var student = await _dbContext.Students.FirstOrDefaultAsync(s => s.User.userId == payment.userId);
            long newStudentID = student.StudentId;
            int newStudentIDAsInt;
            int.TryParse(newStudentID.ToString(), out newStudentIDAsInt);
            CourseStudent courseStudent = new CourseStudent { CoursesCourseID = newCourseId, StudentsStudentId = newStudentIDAsInt };
            _dbContext.CourseStudents.Add(courseStudent);
            await _dbContext.SaveChangesAsync();

        }
        public async Task<IEnumerable<User>> GetStudentAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task AddStudentAsync(Student student)
        {
            _dbContext.Students.Add(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetStudentByUserIdAsync(long userid)
        {
            return await _dbContext.Users.Where(s => s.userId == userid).FirstOrDefaultAsync();  // changes made by rohit
        }

        public async Task<List<Student>> GetEnquiryAsync()
        {
            return await _dbContext.Students.Include(s => s.Enquiries).ToListAsync();
        }

        public async Task<List<Student>> GetEnquiryByEnquiryIdAsync(long ID)
        {
            return await _dbContext.Students.Include(s => s.Enquiries)
                .Where(s => s.Enquiries.Any(e => e.EnquiryID == ID))
                .ToListAsync();
        }

        public async Task<IEnumerable<Student>> GetCoursesAsync()
        {
            var students = await _dbContext.Students.ToListAsync();
            foreach (Student student in students)
            {
                List<int> studentCourseIds = await _dbContext.CourseStudents.Where(x => x.StudentsStudentId == student.StudentId).Select(x => x.CoursesCourseID).ToListAsync();
                student.Courses = await _dbContext.Courses.Where(y => studentCourseIds.Contains(y.CourseID)).ToListAsync();
            }
            
            return students;
        }
        //      public async Task<IEnumerable<CourseStudent>> GetCoursesAsync()
        // {
        //     return await _dbContext.CourseStudents.ToListAsync();
        // }

       
//         public async Task<List<Student>> GetCoursesAsync(int studentId,int courseId)
// {
//     return await _dbContext.Students
//                            .Where(s => s.StudentId == studentId).Include(c=>c.Courses)
//                            .Where(c=>c.CourseID==courseId)
//                            .ToListAsync();
// }
//  public async Task<IEnumerable<dynamic>> GetCourseByCourseIdAsync(long id);
//         {

                      
//             return (_dbContext.Students.Join(_dbContext.CourseStudents,
//                                 stud=>stud.StudentId,
//                                 course=>course.StudentsStudentId,
//                                 (stud,course)=>new {
//                                     StudentId=stud.StudentId,
//                                     StudentName=stud.StudentName,
//                                     CourseID=course.CoursesCourseID
                                    
//                                 })).Join(_dbContext.Courses,
//                                 stud=>stud.CourseID,
//                                 c=>c.CourseID,
//                                 (stud,course)=>new{
//                                     StudentId=stud.StudentId,
//                                     StudentName=stud.StudentName,
//                                     CourseID=course.CourseID,
//                                     CourseName=course.CourseName
//                                 }

//                                 );
//         }
        
     
 

        public async Task<List<Course>> GetCourseByCourseIdAsync(long CourseID)
        {
            return await _dbContext.Courses.Where(s => s.CourseID == CourseID).ToListAsync();
        }
    }
}
