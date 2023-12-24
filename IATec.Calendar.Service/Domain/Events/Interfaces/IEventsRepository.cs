using System.Threading.Tasks;
using IATec.Calendar.Domain.Events.Entities;

namespace IATec.Calendar.Domain.Events.Handlers
{
    public interface IEventsRepository
    {
        Task CreateAsync(EventEntityDomain entity);
    }
}
