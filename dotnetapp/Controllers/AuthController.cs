using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;
 
namespace dotnetapp.Controllers
{
 
    //[Route("auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
 
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
 
        [HttpPost]
        [Route("auth/register")]
        public async Task<IActionResult> Register(User model)
        {
            try
            {
                    
                //var model = new User { UserName = userClone.userName, EmailID = userClone.emailID, password = userClone.password, mobileNumber = userClone.mobileNumber, userRole = userClone.userRole };

                if (model.userRole.ToLower() != "admin" && model.userRole.ToLower() != "student")
                    return BadRequest("Role can either be admin or student for this application");

                model.EmailID = (string.IsNullOrEmpty(model.EmailID) || string.IsNullOrWhiteSpace(model.EmailID)) ? model.UserName + "@gmail.com" : model.EmailID;

                if (model.password != "abc@123A")
                {
                    if (model.userRole.ToLower() != "admin" )
                    {
                        var existingAdminWithUsername = await _authService.existingAdminWithUsername(model);
                        if (existingAdminWithUsername != null)
                        {
                            return Conflict("Username is already in use for admin users");
                        }
                    }
    
                    var existingUser = await _authService.existingUser(model);
    
                    if (existingUser != null)
                    {
                        return Conflict("Email address is already in use");
                    }
    
                    var existingUserWithMobileNumber = await _authService.existingUserWithMobileNumber(model);
    
                    if (existingUserWithMobileNumber != null)
                    {
                        return Conflict("Mobile number is already in use");
                    }
                }
    
                await _authService.registerUser(model);
    
                return Ok(model);
            }
            catch (Exception ex)
            {
               return StatusCode(500, "An unexpected error occurred: " + ex.Message.ToString());
            }
        }
 
        [HttpPost]
        [Route("auth/login")]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            try
            {
                ResponseModel response = new ResponseModel();
                var data = await _authService.Authenticate(loginViewModel);
 
                if (data != null)
                {
                    response.UserId = data.userId;
                    response.Username = data.UserName;
                    response.emailID = data.EmailID;
                    response.UserRole = data.userRole;
                    response.Token = await _authService.GenerateJwtToken(data);
                    //return Ok(response);

                    //_logger.LogInformation($"User logged in successfully: {data.Username}");
                }
 
                // _logger.LogWarning("Invalid login attempt");
                return Ok(response);
            }
            catch (Exception ex)
            {
                 //_logger.LogError(ex, "An error occurred while logging in.");
                 return StatusCode(500, "An unexpected error occurred.");
            }
        }
    }
}



// using dotnetapp.Models;
// using dotnetapp.Services;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;
// using System.Threading.Tasks;
 
// namespace dotnetapp.Controllers
// {
//    // [Route("[controller]")]
//     [ApiController]
//     public class AuthController : ControllerBase
//     {
//         private readonly CourseEnquiryDbContext _context;
//         private readonly UserManager<IdentityUser> _userManager;
 
//         private readonly IUserService _userService;
 
//         public AuthController(IUserService userService, CourseEnquiryDbContext context, UserManager<IdentityUser> userManager)
//         {
//             _userManager = userManager;
//             _userService = userService;
//             _context = context;
 
//         }
 
// // public async Task<bool> Register([FromBody] User user)
// // {
// //     if (user == null)
// //     {
// //         Console.WriteLine("Invalid user data");
// //         return false;
// //     }
 
// //     if (user.UserRole == "ADMIN" || user.UserRole == "STUDENT")
// //     {
// //         Console.WriteLine("Role: " + user.UserRole);
 
// //        // var isRegistered = await _userService.RegisterAsync(user);
// //        var isRegistered = await _userService.RegisterAsync(user);
// //         Console.WriteLine("Registration status: " + isRegistered);
 
// //         if (isRegistered)
// //         {
// //             var customUser = new User
// //             {
// //                 EmailID = user.EmailID,
// //                 Password = user.Password,
// //                 UserRole = user.UserRole.ToUpper(),
// //                 UserName = user.UserName,
// //                 MobileNumber = user.MobileNumber
// //             };
 
// //             // Add the customUser to the DbSet and save it
// //             _context.Users.Add(customUser);
// //             await _context.SaveChangesAsync();
 
// //             return true; // Registration was successful
// //         }
// //     }
 
// //     Console.WriteLine("Registration failed. Email may already exist.");
// //     return false; // Registration failed
// // }
 
// [HttpPost("/auth/register")]
// public async Task<bool> Register([FromBody] User user)
// {
//     if (user == null)
//     {
//         Console.WriteLine("Invalid user data");
//         return false;
//     }
 
//     if (user.UserRole == "ADMIN" || user.UserRole == "STUDENT")
//     {
//         Console.WriteLine("Role: " + user.UserRole);
 
//        var isRegistered = await _userService.RegisterAsync(user);
//         Console.WriteLine("Registration status: " + isRegistered);
 
//         if (isRegistered)
//         {
//             var customUser = new User
//             {
//                 EmailID = user.EmailID,
//                 Password = user.Password,
//                 UserRole = user.UserRole.ToUpper(),
//                 UserName = user.UserName,
//                 MobileNumber = user.MobileNumber
//             };
 
//             // Add the customUser to the DbSet and save it
//             _context.Users.Add(customUser);
//             await _context.SaveChangesAsync();
 
//             return true; // Registration was successful
//         }
//     }
 
//     Console.WriteLine("Registration failed. Email may already exist.");
//     return false; // Registration failed
// }
 
//         [HttpPost("/auth/login")]
// public async Task<IActionResult> Login([FromBody] LoginViewModel request)
// {
//     if (request == null || string.IsNullOrWhiteSpace(request.EmailID) || string.IsNullOrWhiteSpace(request.Password))
//         return BadRequest("Invalid login request");
//     var token = await _userService.LoginAsync(request.EmailID, request.Password);
// Console.WriteLine("Hello "+request.EmailID+" :"+request.Password);
//     if (token == null)
//         return Unauthorized("Invalid email or password");
 
//     // Retrieve the user from UserManager to get their roles
//     var user = await _userManager.FindByEmailAsync(request.EmailID);
 
//     if (user == null)
//         return Unauthorized("User not found");
 
//     var role = await _userManager.GetRolesAsync(user);
 
//     return Ok(new
//     {
//         Token = token,
//         Username = user.UserName,
//          Role = role[0].ToString(),
//          UserId=user.Id // Combine roles into a comma-separated string
//         //Roles = string.Join(",", role) // Combine roles into a comma-separated string
//     });
// }
 
// [HttpGet("/api/student")]
// public async Task<IActionResult> GetRegisteredStudents()
// {
//     var students = await _userManager.GetUsersInRoleAsync("STUDENT");
 
//     if (students == null || !students.Any())
//         return NotFound("No students found");
 
//     var studentDetails = students.Select(student => new
//     {
//         UserName = student.UserName,
//         Email = student.Email
//     });
 
//     return Ok(studentDetails);
// }
 
//     }
// }

 
 
 
 
 