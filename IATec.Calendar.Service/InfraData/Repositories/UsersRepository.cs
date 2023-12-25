using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IATec.Calendar.Domain;
using IATec.Calendar.Domain.Users.Entities;
using IATec.Calendar.Domain.Users.Handlers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace IATec.Calendar.InfraData.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private Context _context;
        private ILogger<EventsRepository> _logger;

        public UsersRepository(Context context, ILogger<EventsRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task CreateAsync(UserEntityDomain userEntityDomain)
        {
            try
            {
                _context.Users.Add(userEntityDomain);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
        }

        public async Task<List<UserEntityDomain>> SelectAllUsers(Guid userId)
        {
            try
            {
                return await _context.Users.Where(x => x.Id != userId).ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
    }
}
