using System;
using iatec.calendar.service.domain;

namespace iatec.calendar.mediator.commands
{
    public class UpdateUserCommand : UserBaseCommand
    {
        public UserEntityDomain ToEntity()
            => new UserEntityDomain(Guid.NewGuid(),
                                    Name,
                                    Email,
                                    Password);
    }
}
