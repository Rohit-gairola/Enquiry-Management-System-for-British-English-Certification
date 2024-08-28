using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace dotnetapp
{
    public class ResponseLoggingMiddleware
    {
         private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public ResponseLoggingMiddleware(RequestDelegate next, ILogger<ResponseLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        await _next(context);
        _logger.LogInformation($"HTTP Response - {context.Response.StatusCode}: {context.Request.Method} {context.Request.Path}");
    }
    }
}