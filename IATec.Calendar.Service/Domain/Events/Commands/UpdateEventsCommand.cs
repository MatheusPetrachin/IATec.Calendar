using System;
using IATec.Calendar.Domain.Events.Commands.Base;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Enums;

namespace IATec.Calendar.Domain.Events.Commands
{
    public class UpdateEventsCommand : BaseEventsCommand
    {
        public EventEntityDomain ToEntity(EventEntityDomain record)
            => new EventEntityDomain(record.Id,
                                     Name,
                                     Description,
                                     StartDate,
                                     EndDate,
                                     Localization,
                                     EStatus.ACTIVE,
                                     record.CreatedBy,
                                     record.CreatdAt,
                                     UserId,
                                     DateTime.Now);
    }
}
