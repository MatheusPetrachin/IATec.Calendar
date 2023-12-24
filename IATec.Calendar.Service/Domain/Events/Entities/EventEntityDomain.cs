using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using IATec.Calendar.Domain.UserEvents.Entities;
using IATec.Calendar.Enums;


namespace IATec.Calendar.Domain.Events.Entities
{
    [Table("events", Schema = "calendar")]
    public class EventEntityDomain
    {
        public EventEntityDomain(Guid id,
                                 string name,
                                 string description,
                                 DateTime startDate,
                                 DateTime endDate,
                                 string localization,
                                 EStatus status,
                                 Guid createdBy,
                                 DateTime creatdAt,
                                 Guid? updatedBy,
                                 DateTime? updatedAt)
        {
            Id = id;
            Name = name;
            Description = description;
            StartDate = startDate;
            EndDate = endDate;
            Status = status;
            Localization = localization;
            CreatedBy = createdBy;
            CreatdAt = creatdAt;
            UpdatedBy = updatedBy;
            UpdatedAt = updatedAt;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }
        public string Localization { get; private set; }
        public EStatus Status { get; private set; }
        public Guid CreatedBy { get; private set; }
        public DateTime CreatdAt { get; private set; }
        public Guid? UpdatedBy { get; private set; }
        public DateTime? UpdatedAt { get; private set; }
        public List<UserEventEntityDomain> Participants { get; set; } = new List<UserEventEntityDomain>();
    }

    internal class IgnoreColumnAttribute : Attribute
    {
    }
}
