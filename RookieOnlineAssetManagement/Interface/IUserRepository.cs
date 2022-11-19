using RookieOnlineAssetManagement.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Interface
{
    public interface IUserRepository
    {
        public Task<List<UserModel>> GetAllAsync(int Page);
        public Task<List<UserModel>> GetUserByType(string Type);
        public Task<List<UserModel>> FindUser(string Find);
        public Task<List<UserModel>> SortUser(string Sort);

    }
}
