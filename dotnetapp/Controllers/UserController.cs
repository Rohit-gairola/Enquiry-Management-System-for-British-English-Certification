using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Mvc;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
 
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
 
        [HttpPost("student")]
        public async Task<IActionResult> AddStudent([FromBody] Student student)
        {
            await _userService.AddStudentAsync(student);
            return Ok();
        }
 
        [HttpPut("student/{id}")]
        public async Task<IActionResult> UpdateStudent(long id, [FromBody] Student student)
        {
            await _userService.UpdateStudentAsync(id, student);
            return Ok("Student updated successfully");
        }
 
        [HttpDelete("student/{id}")]
        public async Task<IActionResult> DeleteStudent(long id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var response = await _userService.DeleteStudentAsync(id);
            if(response == "Ok")
                return Ok("Student deleted successfully");
            return BadRequest();
        }
 
        [HttpPost("student/payment")]
        public async Task<IActionResult> AddStudentPayment(Payment payment)
        {
            //userId, EnquiryId
            // strudentId from userId, courseId from EnquiryId
            await _userService.AddStudentPaymentAsync(payment);
            return Ok();
        }
 
        [HttpGet("student")]
        public async Task<ActionResult<User>> GetStudent()
        {
            var student = await _userService.GetStudentAsync();
            return Ok(student);
        }
 
        [HttpGet("student/user/{userid}")]
        public async Task<ActionResult<List<User>>> GetStudentByUserId(long userid)
        {
            if (userid == null)
            {
                return NotFound();
            }
            var students = await _userService.GetStudentByUserIdAsync(userid);
            if (students == null)
            {
                if (ModelState.IsValid)
                {
                    return NoContent();
                }
            }
            return Ok(students);
        }
 
        [HttpGet("student/enquiry")]
        public async Task<ActionResult<List<Student>>> GetEnquiry()
        {
            var students = await _userService.GetEnquiryAsync();
            return Ok(students);
        }
 
        [HttpGet("student/enquiry/{id}")]
        public async Task<ActionResult<List<Student>>> GetEnquiryByEnquiryId(long id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var students = await _userService.GetEnquiryByEnquiryIdAsync(id);
            if (students == null)
            {
                if (ModelState.IsValid)
                    return NoContent();
            }
            return Ok(students);
        }
 
        [HttpGet("student/course")]
        public async Task<ActionResult<IEnumerable<Student>>> GetCourses()
        {
            var students = await _userService.GetCoursesAsync();
            return Ok(students);
        }
 
        [HttpGet("student/course/{id}")]
        public async Task<ActionResult<List<Course>>> GetCourseByCourseId(long id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var course = await _userService.GetCourseByCourseIdAsync(id);
            if (ModelState.IsValid && course != null)
            {
                return Ok(course);
            }
            return NoContent();
        }
    }
}
