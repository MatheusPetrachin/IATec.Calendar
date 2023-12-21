using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using iatec.calendar.enums;
using iatec.calendar.models;


namespace iatec.calendar.service.domain
{
    [Table("events", Schema = "calendar")]
    public class EventEntityDomain
    {
        public EventEntityDomain(Guid id,
                                 string name,
                                 string description,
                                 string street,
                                 string number,
                                 string neighborhood,
                                 string city,
                                 EStatus status,
                                 Guid participantId,
                                 Guid createdBy,
                                 DateTime creatdAt,
                                 Guid updatedBy,
                                 DateTime updatedAt)
        {
            Id = id;
            Name = name;
            Description = description;
            Street = street;
            Number = number;
            Neighborhood = neighborhood;
            City = city;
            Status = status;
            ParticipantId = participantId;
            CreatedBy = createdBy;
            CreatdAt = creatdAt;
            UpdatedBy = updatedBy;
            UpdatedAt = updatedAt;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public string Street { get; private set; }
        public string Number { get; private set; }
        public string Neighborhood { get; private set; }
        public string City { get; private set; }
        public EStatus Status { get; private set; }
        public Guid ParticipantId { get; private set; }
        public Guid CreatedBy { get; private set; }
        public DateTime CreatdAt { get; private set; }
        public Guid UpdatedBy { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        public List<UserEventEntityDomain> Participants { get; set; }
    }
}
