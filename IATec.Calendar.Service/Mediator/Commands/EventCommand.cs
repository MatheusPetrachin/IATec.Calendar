using System;
using iatec.calendar.enums;

namespace iatec.calendar.mediator.commands
{
    public class EventCommand
    {
        public Guid Id { get; private set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public EStatus Status { get; set; }
        public Guid ParticipantId { get; set; }

        public void SetId(Guid value) => Id = value;
    }
}
