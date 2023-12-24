using System;
using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Handlers;
using IATec.Calendar.Domain.UserEvents.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public class EventsHandler : IRequestHandler<CreateEventsCommand>,
                                 IRequestHandler<DeleteEventsCommand>
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
                var entity = request.ToEntity();

                request.ParticipantIds?.ForEach(userId =>
                {
                    entity.Participants.Add(new UserEventEntityDomain()
                    {
                        EventId = entity.Id,
                        UserId = userId
                    });
                });

                await _eventsRepository.CreateAsync(entity);

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Unit.Value;
            }
        }

        public async Task<Unit> Handle(DeleteEventsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                await _eventsRepository.DeleteAsync(request);

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
