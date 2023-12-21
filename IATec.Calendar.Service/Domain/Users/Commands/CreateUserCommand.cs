using System;
using IATec.Calendar.Domain.Users.Commands.Base;
using IATec.Calendar.Domain.Users.Entities;

namespace IATec.Calendar.Domain.Users.Commands
{
    public class CreateUserCommand : UserBaseCommand
    {
        public UserEntityDomain ToEntity()
            => new UserEntityDomain(Guid.NewGuid(),
                                    Name,
                                    Email,
                                    Password);
    }
}
