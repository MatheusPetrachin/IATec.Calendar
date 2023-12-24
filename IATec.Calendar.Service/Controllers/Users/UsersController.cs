using System;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Users.Commands;
using IATec.Calendar.Domain.Users.Handlers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Controllers.Users
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IMediator _mediator;
        private readonly IUsersRepository _repository;

        public UsersController(IMediator mediator,
                               IUsersRepository repository,
                               ILogger<UsersController> logger)
        {
            _mediator = mediator;
            _repository = repository;
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

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on POST {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        /// <summary>
        /// Get all User.
        /// </summary>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("All")]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var test = await _repository.SelectAllUsers();

                return Ok(test);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on POST {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
