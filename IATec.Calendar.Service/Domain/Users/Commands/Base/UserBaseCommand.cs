using System;
using MediatR;

namespace IATec.Calendar.Domain.Users.Commands.Base
{
    public class UserBaseCommand : IRequest
    {
        public Guid Id { get; private set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public void SetId(Guid value) => Id = value;
    }
}
