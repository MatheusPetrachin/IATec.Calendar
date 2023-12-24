using System;
using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Handlers;
using MediatR;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public class EventsHandler : IRequestHandler<CreateEventsCommand>
    {
        private ILogger<EventsHandler> _logger;
        public IEventsRepository _eventsRepository;

        public EventsHandler(ILogger<EventsHandler> logger,
                             IEventsRepository eventsRepository)
        {
            _logger = logger;
            _eventsRepository = eventsRepository;
        }

        public async Task<Unit> Handle(CreateEventsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _eventsRepository.CreateAsync(request.ToEntity());

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Unit.Value;
            }
        }
    }
}
