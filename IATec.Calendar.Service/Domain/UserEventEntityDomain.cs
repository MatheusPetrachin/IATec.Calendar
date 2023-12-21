using System;
using System.ComponentModel.DataAnnotations.Schema;
using iatec.calendar.service.domain;

namespace iatec.calendar.models
{
    [Table("userevent", Schema = "calendar")]
    public class UserEventEntityDomain
    {
        public Guid UserId { get; set; }
        public UserEntityDomain User { get; set; }

        public Guid EventId { get; set; }
        public EventEntityDomain Event { get; set; }
    }
}
