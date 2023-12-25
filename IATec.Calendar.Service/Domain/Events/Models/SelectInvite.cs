using System;
using System.Collections.Generic;

namespace IATec.Calendar.Domain.Events.Models
{
    public class SelectInvite
    {
        public Guid EventId { get; set; }
        public string HostName { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Localization { get; set; }
        public List<string> ParticipantNames { get; set; }
    }
}
