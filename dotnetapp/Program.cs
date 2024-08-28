using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;

// JWT stuff
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;
 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Configuration.AddJsonFile("appsettings.json"); // JWT Stuff

builder.Services.AddControllers();

var connectionstring=builder.Configuration.GetConnectionString("mycon");
builder.Services.AddDbContext<CourseEnquiryDbContext>(options=>options.UseSqlServer(connectionstring));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddDbContext<CourseEnquiryDbContext>(options=>options.UseSqlServer("user id=sa;password=examlyMssql@123;server=localhost;Initial Catalog=EnquiryDb;trusted_connection=false;Persist Security Info=False;Encrypt=False"));
builder.Services.AddTransient<ICourseService,CourseService>();
builder.Services.AddTransient<IEnquiryService,EnquiryService>();
builder.Services.AddTransient<IAuthService,AuthService>();
builder.Services.AddTransient<IUserService,UserService>();
builder.Services.AddCors();
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);


//JWT stuff
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:SecretKey"]))
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors(options=> { options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();});

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();




