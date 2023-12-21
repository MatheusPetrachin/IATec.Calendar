using System;
using System.Threading;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Users.Commands;
using IATec.Calendar.Domain.Users.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public class UserHandler : IRequestHandler<CreateUserCommand>,
                                IRequestHandler<UpdateUserCommand>,
                                IRequestHandler<DeleteUserCommand>
    {
        private readonly ILogger<UserHandler> _logger;
        private readonly Context _context;

        public UserHandler(Context context,
                           ILogger<UserHandler> logger)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                UserEntityDomain userEntityDomain = request.ToEntity();

                _context.Users.Add(userEntityDomain);
                _context.SaveChanges();

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Unit.Value;
            }
        }

        public Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
