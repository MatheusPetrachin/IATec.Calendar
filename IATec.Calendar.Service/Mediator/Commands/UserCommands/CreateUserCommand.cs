using System;
using iatec.calendar.service.domain;

namespace iatec.calendar.mediator.commands
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
