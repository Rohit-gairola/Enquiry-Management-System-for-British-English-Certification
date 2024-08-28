using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;
public class CommunicationException : Exception
{
    public CommunicationException(string message) : base(message)
    {
    }
}
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class EnquiryController : ControllerBase
    {
        private readonly IEnquiryService _enquiryService;
        public EnquiryController(IEnquiryService enquiryService)
        {
            _enquiryService = enquiryService;
        }

        [HttpGet("enquiry")]
        public async Task<ActionResult<IEnumerable<Enquiry>>> GetEnquiries()
        {
            var enquiries = await _enquiryService.GetEnquiryAsync();
            return Ok(enquiries);
        }
        // new getPayment API by Rohit
        [HttpGet("payment")]
        public async Task<ActionResult<IEnumerable<Enquiry>>> GetPayments(){
            var payments=await _enquiryService.GetPaymentsAsync();
            return Ok(payments);  
        }
// made test changes
        [HttpGet("user/{id}")]
        public async Task<ActionResult<Enquiry>> GetEnquiryById(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var enquiry = await _enquiryService.GetEnquiryIdAsync(id);

            if (enquiry == null)
            {
                return NoContent();
            }

            return Ok(enquiry);
        }

        [HttpPost("enquiry")]

        public async Task<ActionResult<Enquiry>> AddEnquiry([FromBody] Enquiry enquiry)
        {
            if (enquiry.AdminResponse == null) enquiry.EnquiryStatus = "pending";
            await _enquiryService.AddEnquiryAsync(enquiry);
            return Created("Created successfully", enquiry);
        }

        [HttpPut("enquiry/{id}")]
        public async Task<ActionResult> UpdateEnquiry(int id, [FromBody] Enquiry enquiry)
        {
            await _enquiryService.UpdateEnquiryAsync(id, enquiry);
            return NoContent();
        }

        [HttpDelete("enquiry/{id}")]
        public async Task<ActionResult> DeleteEnquiry(int id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var response = await _enquiryService.DeleteEnquiryAsync(id);
            if (response == "404") return BadRequest("No Enquiry exists");
            return Ok();
        }

        [HttpGet("user/{userid}")]
        public async Task<ActionResult<IEnumerable<Enquiry>>> GetEnquiriesByUserId(int userid)
        {
            if (userid == null)
            {
                return NotFound();
            }
            var enquiries = await _enquiryService.GetEnquiryByUserId(userid);
            if (ModelState.IsValid && enquiries != null)
            {
                return Ok(enquiries);
            }
            return NoContent();
        }

        // // new getPayment API by Rohit
        // [HttpGet("payment")]
        // public async Task<ActionResult<IEnumerable<Enquiry>>> GetPayments(){
        //     var payments=await _enquiryService.GetPaymentsAsync();
        //     return Ok(payments);  
        // }
    }
}
