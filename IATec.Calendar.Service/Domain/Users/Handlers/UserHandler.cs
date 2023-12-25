using System;
using System.Linq;
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
        private readonly IUsersRepository _repository;

        public UserHandler(Context context,
                           IUsersRepository repository,
                           ILogger<UserHandler> logger)
        {
            _context = context;
            _repository = repository;
            _logger = logger;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                if (_context.Users.Any(x => x.Email.Equals(request.Email)))
                {
                    throw new Exception("O e-mail fornecido já está em uso.");
                }

                await _repository.CreateAsync(request.ToEntity());

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
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
