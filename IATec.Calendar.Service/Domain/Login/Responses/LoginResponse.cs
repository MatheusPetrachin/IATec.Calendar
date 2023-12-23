using MediatR;

namespace IATec.Calendar.Domain.Login.Response
{
    public class LoginResponse
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
