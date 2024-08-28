using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
 
// JWT Stuff
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
 
 
 
 
namespace dotnetapp.Services{
    public class AuthService: IAuthService{
        private readonly CourseEnquiryDbContext _context;
        //JWT stuff
        private readonly IConfiguration _configuration;
        public AuthService(CourseEnquiryDbContext context, IConfiguration configuration){
            _context=context;
            _configuration=configuration;  // JWT stuff
        }
 
        public async Task<User> existingAdminWithUsername(User model){
 
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == model.UserName);
        }
 
        public async Task<User> existingUser(User model){
            return await _context.Users.FirstOrDefaultAsync(u => u.EmailID == model.EmailID);
        }
 
        public async Task<User> existingUserWithMobileNumber(User model){
           return  await _context.Users.FirstOrDefaultAsync(u => u.mobileNumber == model.mobileNumber);
          //return  await _context.Users.FirstOrDefaultAsync(u => u.MobileNumber == model.MobileNumber);
        }
 
        public async Task registerUser(User newUser){
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }
 
        // public async Task<User> loginUser(User model){
        //    return await _context.Users.FirstOrDefaultAsync(u => u.EmailID == model.EmailID && u.password == model.password);
        // }
 
 
        //JWT stuff
 
        public async Task<string> GenerateJwtToken(User user)
        {
 
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.userId.ToString()),
                new Claim(ClaimTypes.Email,user.EmailID),
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.Role,user.userRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(int.Parse(_configuration["JwtSettings:ExpirationHours"])),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
 
 
        public async Task<User> Authenticate(LoginViewModel loginViewModel)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.EmailID == loginViewModel.emailID && u.password == loginViewModel.password);
            // Implement authentication logic here (e.g., verify password)
            return user;
        }
    }
}
 
