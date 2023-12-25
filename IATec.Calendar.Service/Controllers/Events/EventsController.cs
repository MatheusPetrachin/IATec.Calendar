using System;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Models;
using IATec.Calendar.Domain.Users.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Controllers.Events
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly ILogger<EventsController> _logger;
        private readonly IMediator _mediator;
        private readonly Context _context;

        public EventsController(IMediator mediator,
                               ILogger<EventsController> logger,
                               Context context)
        {
            _mediator = mediator;
            _logger = logger;
            _context = context;
        }

        /// <summary>
        /// Get Events.
        /// </summary>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet]
        public async Task<IActionResult> Get([FromHeader] Guid userId,
                                             [FromHeader] DateTime period)
        {
            try
            {
                var events = await _context.Events.Where(x => x.CreatedBy == userId && x.StartDate.Date == period.Date && !x.Deleted).ToListAsync();
                return Ok(events);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on GET {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Get Events.
        /// </summary>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            try
            {
                var events = await _context.Events.Where(x => x.Id == id).FirstOrDefaultAsync();
                events.Participants = await _context.UserEvents.Where(x => x.EventId == id).ToListAsync();

                return Ok(new SelectEvent()
                {
                    Id = events.Id,
                    Name = events.Name,
                    Description = events.Description,
                    StartDate = events.StartDate,
                    EndDate = events.EndDate,
                    Localization = events.Localization,
                    StartHour = events.StartDate.Hour,
                    StartMinute = events.StartDate.Minute,
                    EndHour = events.EndDate.Hour,
                    EndMinute = events.EndDate.Minute,
                    ParticipantIds = events.Participants.Select(x => x.UserId).ToList(),
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on GET {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPost]
        public async Task<IActionResult> Post([FromHeader] Guid userId,
                                              [FromBody] CreateEventsCommand command)
        {
            try
            {
                command.SetUserId(userId);
                command.UpdatePeriod();

                await _mediator.Send(command);

                return Ok(command);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on POST {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] Guid id,
                                              [FromHeader] Guid userId,
                                              [FromBody] UpdateEventsCommand command)
        {
            try
            {
                command.SetId(id);
                command.SetUserId(userId);
                command.UpdatePeriod();

                await _mediator.Send(command);

                return Ok(command);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on PUT {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id, [FromHeader] Guid userId)
        {
            try
            {
                DeleteEventsCommand command = new DeleteEventsCommand();
                command.SetId(id);
                command.DeletedAt = DateTime.Now;
                command.DeletedBy = userId;

                await _mediator.Send(command);

                return Ok(command);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error on DELETE {this.GetType().Name}");
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
