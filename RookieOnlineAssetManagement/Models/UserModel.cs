using RookieOnlineAssetManagement.Enum;
using System;

namespace RookieOnlineAssetManagement.Models
{
    public class UserModel
    {
        public string StaffCode { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public DateTime JoinedDate { get; set; }
        public UserType Type { get; set; }
    }
}
