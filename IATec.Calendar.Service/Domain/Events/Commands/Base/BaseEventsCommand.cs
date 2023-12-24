using System;
using System.Collections.Generic;
using MediatR;

namespace IATec.Calendar.Domain.Events.Commands.Base
{
    public class BaseEventsCommand : IRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<Guid> ParticipantIds { get; set; }
        public string Localization { get; set; }

        public Guid UserId { get; private set; }
        public void SetUserId(Guid value) => UserId = value;
    }
}
