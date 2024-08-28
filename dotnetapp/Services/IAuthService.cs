using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public interface IAuthService
    {
        Task<User> existingAdminWithUsername(User model);
        Task<User> existingUser(User model);
        Task<User> existingUserWithMobileNumber(User model);
        Task registerUser(User newUser);
     //   Task<User> loginUser(User model);

        // JWT stuff
        Task<string> GenerateJwtToken(User user);
        Task<User> Authenticate(LoginViewModel loginViewModel);
    }
}






    
