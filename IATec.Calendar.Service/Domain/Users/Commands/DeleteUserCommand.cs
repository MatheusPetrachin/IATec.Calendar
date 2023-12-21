using System;
using MediatR;

namespace IATec.Calendar.Domain.Users.Commands
{
    public class DeleteUserCommand : IRequest
    {
        public Guid Id { get; private set; }
        public void SetId(Guid value) => Id = value;
    }
}
