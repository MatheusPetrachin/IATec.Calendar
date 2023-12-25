using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Commands.Base;
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
                validator(request);

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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }

        public async Task<Unit> Handle(UpdateEventsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                validator(request);

                var record = _context.Events.Find(request.Id);
                var entity = request.ToEntity(record);
                request.ParticipantIds?.ForEach(userId =>
                {
                    entity.Participants.Add(new UserEventEntityDomain()
                    {
                        EventId = entity.Id,
                        UserId = userId
                    });
                });


                await _eventsRepository.UpdateAsync(entity);

                return Unit.Value;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private void validator<T>(T request) where T : BaseEventsCommand
        {
            try
            {
                bool isExclusive = !request.ParticipantIds.Any();

                if (isExclusive)
                {
                    var listExclusiveEvents = _context.Events.Where(x => x.Id != request.Id && !x.Deleted && !x.Participants.Any() && x.CreatedBy == request.UserId);

                    var isOverlapping = listExclusiveEvents.ToList().Find(record => record.StartDate <= request.EndDate && request.StartDate <= record.EndDate);

                    if (isOverlapping != null)
                        throw new Exception("Eventos exclusivos não podem sobrepor outros eventos exclusivos, Já existe um evento que inicia/termina nesta Data/Hora!");
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
