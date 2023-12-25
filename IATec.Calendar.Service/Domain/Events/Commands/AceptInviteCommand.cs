using System;
using IATec.Calendar.Domain.UserEvents.Entities;
using IATec.Calendar.Domain.Users.Entities;
using IATec.Calendar.Enums;
using MediatR;

namespace IATec.Calendar.Domain.Events.Commands
{
    public class AceptInviteCommand : IRequest
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public EStatus Status { get; set; }

        internal UserEventEntityDomain ToEntity()
        {
            return new UserEventEntityDomain(UserId, EventId, Status);
        }
    }
}
