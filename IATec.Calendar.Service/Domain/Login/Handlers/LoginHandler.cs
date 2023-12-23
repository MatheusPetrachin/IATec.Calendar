using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Login.Commands;
using MediatR;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public class LoginHandler : IRequestHandler<LoginCommand>
    {
        public Task<Unit> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
