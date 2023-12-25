using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.Events.Handlers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
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
                record.Participants = await _context.UserEvents.Where(x => x.EventId == eventEntityDomain.Id).ToListAsync();

                if (record != null)
                {
                    _context.Entry(record).CurrentValues.SetValues(eventEntityDomain);

                    //remover quem não vai mais participar, adicionar quem vai participar e ignorar quem já esta participando

                    // Remover quem não vai mais participar
                    record.Participants = record.Participants.Where(id => eventEntityDomain.Participants.Contains(id)).ToList();

                    // Adicionar quem vai participar
                    record.Participants.AddRange(eventEntityDomain.Participants.Where(id => !record.Participants.Contains(id)));

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
