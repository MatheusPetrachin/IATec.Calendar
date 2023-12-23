using MediatR;

namespace IATec.Calendar.Domain.Login.Commands
{
    public class LoginCommand : IRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
