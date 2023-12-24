using System;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
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

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }
    }
}
