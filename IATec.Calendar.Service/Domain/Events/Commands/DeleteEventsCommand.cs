using System;
using IATec.Calendar.Domain.Events.Commands.Base;

namespace IATec.Calendar.Domain.Events.Commands
{
    public class DeleteEventsCommand : BaseEventsCommand
    {
        public DateTime DeletedAt { get; set; }
        public Guid DeletedBy { get; set; }
    }
}
