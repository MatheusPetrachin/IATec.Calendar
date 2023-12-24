using System;
using IATec.Calendar.Domain.Events.Commands.Base;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Enums;

namespace IATec.Calendar.Domain.Events.Commands
{
    public class CreateEventsCommand : BaseEventsCommand
    {
        public EventEntityDomain ToEntity()
            => new EventEntityDomain(Guid.NewGuid(),
                                     Name,
                                     Description,
                                     StartDate,
                                     EndDate,
                                     Localization,
                                     EStatus.ACTIVE,
                                     UserId,
                                     DateTime.Now,
                                     null,
                                     null);
    }
}
