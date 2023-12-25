using System;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.Events.Handlers;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.InfraData.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private Context _context;
        private ILogger<EventsRepository> _logger;

        public EventsRepository(Context context, ILogger<EventsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task CreateAsync(EventEntityDomain entity)
        {
            try
            {
                _context.Events.Add(entity);

                foreach (var participant in entity.Participants)
                    _context.UserEvents.Add(participant);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task DeleteAsync(DeleteEventsCommand request)
        {
            try
            {
                _context.Events.Find(request.Id).SetDeleted(request.DeletedBy, request.DeletedAt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task UpdateAsync(EventEntityDomain eventEntityDomain)
        {
            try
            {
                var record = await _context.Events.FindAsync(eventEntityDomain.Id);

                if (record != null)
                {
                    _context.Entry(record).CurrentValues.SetValues(eventEntityDomain);

                    await _context.SaveChangesAsync();
                }
                else
                    throw new Exception("Evento não encontrado!");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
