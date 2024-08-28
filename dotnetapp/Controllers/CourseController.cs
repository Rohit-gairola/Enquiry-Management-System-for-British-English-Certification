using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/course")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
        {
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourseById(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var course = await _courseService.GetCourseById(id);

            if (ModelState.IsValid && course != null)
            {
                return Ok(course);
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Course>> AddCourse([FromBody] Course course)
        {
            await _courseService.AddCourse(course);
            return Ok(course);
        }

        
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCourse(int id, Course course)
        {
            if (id == null) return BadRequest("Id cannot be null");
            var response = await _courseService.UpdateCourse(id, course);
            if (response == "Course doesnot exist") return BadRequest("Course doesnot exist");
            return Ok();
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCourse(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var response = await _courseService.DeleteCourse(id);
            if (response != "") return NotFound("Unable to delete! Course doesn't exists ");
            return Ok();
        }

        
        [HttpGet("payment")]
        public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments([FromQuery] int courseId)
        {
            var payments = await _courseService.GetAllPayments(courseId);
            return Ok(payments);
        }

        
    }
}
