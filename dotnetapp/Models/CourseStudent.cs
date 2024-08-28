using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class CourseStudent
    {   
        [Key]
        public int Id {get;set;}
        public int CoursesCourseID{get;set;}
        public int StudentsStudentId{get;set;}
    }
}