using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using dotnetapp.Models;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorLogsController : ControllerBase
    {
        private readonly string _connectionString = "user id=sa;password=examlyMssql@123;server=localhost;Database=EnquiryDb;trusted_connection=false;Persist Security Info=False;Encrypt=False";

    [HttpPost]
    public IActionResult Post([FromBody] ErrorLogs errorLog)
    {
        try
        {
    
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

               
                using (var command = new SqlCommand("INSERT INTO ErrorLogs (Timestamp, ErrorMessage) VALUES (@Timestamp, @ErrorMessage)", connection))
                {
                    command.Parameters.AddWithValue("@Timestamp", DateTime.Now);
                    command.Parameters.AddWithValue("@ErrorMessage", errorLog.ErrorMessage);
                    command.ExecuteNonQuery();
                }
            }

            return Ok("Error logged successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error logging error to database: {ex.Message}");
        }
    }
    }
}
