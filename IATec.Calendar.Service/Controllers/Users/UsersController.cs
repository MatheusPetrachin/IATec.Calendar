using System;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Controllers.Users
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator,
                               ILogger<UsersController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        /// <summary>
        /// Create User.
        /// </summary>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateUserCommand user)
        {
            try
            {
                user.SetId(Guid.NewGuid());

                await _mediator.Send(user);
                // _context.Users.Add(user);
                // _context.SaveChanges();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on POST {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
