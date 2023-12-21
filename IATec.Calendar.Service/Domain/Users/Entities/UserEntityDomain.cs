using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using IATec.Calendar.Domain.UserEvents.Entities;

namespace IATec.Calendar.Domain.Users.Entities
{
    [Table("users", Schema = "identity")]
    public class UserEntityDomain
    {
        public UserEntityDomain(Guid id,
                                string name,
                                string email,
                                string password)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }

        public List<UserEventEntityDomain> Events { get; set; }
    }
}
