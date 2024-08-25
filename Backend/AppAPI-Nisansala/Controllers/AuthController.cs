using AppAPI_Nisansala.Data;
using AppAPI_Nisansala.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AppAPI_Nisansala.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;
        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<User>> UserRegister(User user)
        {
            var _user = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (_user == null)
            {

                user.Password = _passwordHasher.HashPassword(user, user.Password);
                //user.UserId = new Guid();
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok(User);
            }
            return BadRequest();

        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponse>> LoginUser(User login)
        {
            var user = login;
            //var _user = new UserDto()
            //{
            //    Email = user.Email,
            //    Password = user.Password,

            //};
            if (true)
            {
                //token
                var jwtSettings = _configuration.GetSection("JwtSettings");
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
            new Claim(ClaimTypes.Name, user.Email)
            //new Claim(ClaimTypes.Role, user.Role.ToString())
        };

                var tokenOptions = new JwtSecurityToken(
                    issuer: jwtSettings["Issuer"],
                    audience: jwtSettings["Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpirationInMinutes"])),
                    signingCredentials: signinCredentials
                );

                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                token.ToString();
                //end token
                //var token = GenerateToken(user);
                var loginResponce = new LoginResponse()
                {
                    Id = user.UserId,
                    Email = user.Email,
                    token = token

                };
                return Ok(loginResponce);
            }
            return BadRequest();
        }

        //public async Task<User> AuthenticateUserAsync(User user)
        //{
        //    var _user = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
        //    if (_user != null)
        //    {
        //        var verificationResult = _passwordHasher.VerifyHashedPassword(_user, _user.Password, user.Password);
        //        if (verificationResult == PasswordVerificationResult.Success)
        //        {
        //            return _user;
        //        }
        //        return null;
        //    }
        //    return null;
        //}

        //public string GenerateToken(User user)
        //{
        //    var jwtSettings = _configuration.GetSection("JwtSettings");
        //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
        //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]
        //    {
        //    new Claim(ClaimTypes.Name, user.Email)
        //    //new Claim(ClaimTypes.Role, user.Role.ToString())
        //};

        //    var tokenOptions = new JwtSecurityToken(
        //        issuer: jwtSettings["Issuer"],
        //        audience: jwtSettings["Audience"],
        //        //claims: claims,
        //        expires: DateTime.Now.AddMinutes(double.Parse(jwtSettings["ExpirationInMinutes"])),
        //        signingCredentials: signinCredentials
        //    );

        //    var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        //    token.ToString();
        //    return token;
        //}

    }
}
