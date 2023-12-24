using System;
using System.Collections.Generic;

namespace IATec.Calendar.Domain.Events.Models
{
    public class SelectEvent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Localization { get; set; }
        public int StartHour { get; set; }
        public int StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
        public List<Guid> ParticipantIds { get; set; }
    }
}
