using System;
using MediatR;

namespace iatec.calendar.mediator.commands
{
    public class DeleteUserCommand : IRequest
    {
        public Guid Id { get; private set; }
        public void SetId(Guid value) => Id = value;
    }
}
