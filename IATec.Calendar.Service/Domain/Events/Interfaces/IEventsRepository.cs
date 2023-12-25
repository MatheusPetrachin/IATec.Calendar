using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Commands;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.UserEvents.Entities;

namespace IATec.Calendar.Domain.Events.Handlers
{
    public interface IEventsRepository
    {
        Task CreateAsync(EventEntityDomain entity);
        Task DeleteAsync(DeleteEventsCommand request);
        Task UpdateAsync(EventEntityDomain eventEntityDomain);
        Task AceptEvent(UserEventEntityDomain userEventEntityDomain);
        Task RejectEvent(UserEventEntityDomain userEventEntityDomain);
    }
}
