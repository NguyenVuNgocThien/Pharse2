using AutoMapper;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Models;

namespace RookieOnlineAssetManagement.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserModel>();
        }
    }
}
