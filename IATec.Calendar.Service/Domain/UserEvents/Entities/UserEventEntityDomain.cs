using System;
using System.ComponentModel.DataAnnotations.Schema;
using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.Users.Entities;
using IATec.Calendar.Enums;

namespace IATec.Calendar.Domain.UserEvents.Entities
{
    [Table("userevent", Schema = "calendar")]
    public class UserEventEntityDomain
    {
        public UserEventEntityDomain(Guid userId, Guid eventId)
        {
            UserId = userId;
            EventId = eventId;
            Status = EStatus.PENDING;
        }

        public Guid UserId { get; set; }
        public UserEntityDomain User { get; set; }

        public Guid EventId { get; set; }
        public EventEntityDomain Event { get; set; }

        public EStatus Status { get; set; }


    }
}
