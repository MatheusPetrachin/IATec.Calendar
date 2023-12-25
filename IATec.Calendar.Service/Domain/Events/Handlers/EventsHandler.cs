using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.Events.Handlers;
using IATec.Calendar.Domain.UserEvents.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public class EventsHandler : IRequestHandler<CreateEventsCommand>,
                                 IRequestHandler<DeleteEventsCommand>,
                                 IRequestHandler<UpdateEventsCommand>
    {
        private ILogger<EventsHandler> _logger;
        public IEventsRepository _eventsRepository;
        public Context _context;

        public EventsHandler(ILogger<EventsHandler> logger,
                             IEventsRepository eventsRepository,
                             Context context)
        {
            _logger = logger;
            _eventsRepository = eventsRepository;
            _context = context;
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

        public async Task<Unit> Handle(UpdateEventsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                validator(request);

                var record = _context.Events.Find(request.Id);
                await _eventsRepository.UpdateAsync(request.ToEntity(record));

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Unit.Value;
            }
        }

        private void validator(UpdateEventsCommand request)
        {
            try
            {
                bool isExclusive = !request.ParticipantIds.Any();

                if (isExclusive)
                {
                    var isOverlapping = _context.Events.Any(record => (record.StartDate <= request.StartDate || request.EndDate <= record.StartDate) && record.Id != request.Id);

                    if (isOverlapping)
                        throw new Exception("Já existe um evento que inicia/termina nesta Data/Hora!");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
