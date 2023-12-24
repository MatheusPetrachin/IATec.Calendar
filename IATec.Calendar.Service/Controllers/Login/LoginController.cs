using System;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Login.Commands;
using IATec.Calendar.Domain.Login.Constants;
using IATec.Calendar.Domain.Login.Response;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace IATec.Calendar.Controllers.Login
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly Context _context;
        private readonly IMediator _mediator;

        public LoginController(IMediator mediator,
                               ILogger<LoginController> logger,
                               Context context)
        {
            _mediator = mediator;
            _logger = logger;
            _context = context;
        }

        /// <summary>
        /// Create Access Token.
        /// </summary>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody][Required] LoginCommand command)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email.Equals(command.Email) && x.Password.Equals(command.Password));

                if (user != null)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Settings.Secret));
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim(ClaimTypes.Email, command.Email)
                        }),
                        Expires = DateTime.UtcNow.AddHours(8),
                        SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);

                    return Ok(new LoginResponse()
                    {
                        Id = user.Id.ToString(),
                        Email = user.Email,
                        Name = user.Name,
                        Token = tokenString
                    });
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on POST {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
