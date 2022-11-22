using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IUserRepository
    {
        public Task<List<UserModel>> GetAllAsync(int Page, User user_login);
        public Task<List<UserModel>> GetUserByType(int Page, string Type, User user_login);
        public Task<List<UserModel>> FindUser(string Find, User user_login);
        public Task<List<UserModel>> SortUser(string Sort, User user_login, string Type, string Find);

    }
}
