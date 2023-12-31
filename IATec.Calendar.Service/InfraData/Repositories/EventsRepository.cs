using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.Events.Handlers;
using IATec.Calendar.Domain.UserEvents.Entities;
using Microsoft.EntityFrameworkCore;
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

                foreach (var participant in entity.EventUsers)
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
                record.EventUsers = await _context.UserEvents.Where(x => x.EventId == eventEntityDomain.Id).ToListAsync();

                if (record != null)
                {
                    _context.Entry(record).CurrentValues.SetValues(eventEntityDomain);

                    // Remover quem não vai mais participar
                    record.EventUsers = record.EventUsers.Where(id => eventEntityDomain.EventUsers.Contains(id)).ToList();
                    // Adicionar quem vai participar
                    record.EventUsers.AddRange(eventEntityDomain.EventUsers.Where(id => !record.EventUsers.Contains(id)));

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

        public async Task AceptEvent(UserEventEntityDomain userEventEntityDomain)
        {
            try
            {
                var record = await _context.UserEvents.Where(x => x.UserId == userEventEntityDomain.UserId && x.EventId == userEventEntityDomain.EventId).FirstOrDefaultAsync();

                if (record != null)
                {
                    _context.Entry(record).CurrentValues.SetValues(userEventEntityDomain);
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

        public async Task RejectEvent(UserEventEntityDomain userEventEntityDomain)
        {
            try
            {
                var record = await _context.UserEvents.Where(x => x.UserId == userEventEntityDomain.UserId && x.EventId == userEventEntityDomain.EventId).FirstOrDefaultAsync();

                if (record != null)
                {
                    _context.UserEvents.Remove(record);
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
