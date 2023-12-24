using System;
using System.Collections.Generic;
using MediatR;

namespace IATec.Calendar.Domain.Events.Commands.Base
{
    public class BaseEventsCommand : IRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int StartHour { private get; set; }
        public int StartMinute { private get; set; }
        public DateTime StartDate { get; set; }
        public int EndHour { private get; set; }
        public int EndMinute { private get; set; }
        public DateTime EndDate { get; set; }
        public List<Guid> ParticipantIds { get; set; }
        public string Localization { get; set; }

        public Guid Id { get; private set; }
        public void SetId(Guid value) => Id = value;

        public Guid UserId { get; private set; }
        public void SetUserId(Guid value) => UserId = value;

        internal void UpdatePeriod()
        {
            StartDate = new DateTime(StartDate.Year, StartDate.Month, StartDate.Day, StartHour, StartMinute, 0);
            EndDate = new DateTime(EndDate.Year, EndDate.Month, EndDate.Day, EndHour, EndMinute, 0);
        }
    }
}
