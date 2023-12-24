using System.Collections.Generic;
using System.Threading.Tasks;
using IATec.Calendar.Domain.Users.Entities;

namespace IATec.Calendar.Domain.Users.Handlers
{
    public interface IUsersRepository
    {
        #region commands
        Task CreateAsync(UserEntityDomain userEntityDomain);
        #endregion

        #region queries
        Task<List<UserEntityDomain>> SelectAllUsers();
        #endregion
    }
}
