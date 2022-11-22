
using AutoMapper;
using Duende.IdentityServer.Services;
using Microsoft.EntityFrameworkCore;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Enum;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Profiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Repositories
{

    public class UserRepository : IUserRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public UserRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<UserModel>> FindUser(string Find, User user_login)
        {
            var users = await _context.Users.Where(s => s.StaffCode.ToUpper().Contains(Find.ToUpper()) && s.Location == user_login.Location && s.IsDisabled == false).Select(x => new UserModel
            {
                StaffCode = x.StaffCode,
                FullName = x.FirstName + " " + x.LastName,
                UserName = x.UserName,
                JoinedDate = x.JoinedDate,
                DateofBirth = x.DateofBirth,
                Gender = x.Gender,
                Location = x.Location,
                Type = x.Type
            }).ToListAsync();
            if (users.Count == 0)
            {
                users = await _context.Users.Where(s => (s.FirstName.ToUpper() + " " + s.LastName).Contains(Find.ToUpper()) && s.Location == user_login.Location && s.IsDisabled == false).Select(x => new UserModel
                {
                    StaffCode = x.StaffCode,
                    FullName = x.FirstName + " " + x.LastName,
                    UserName = x.UserName,
                    JoinedDate = x.JoinedDate,
                    DateofBirth = x.DateofBirth,
                    Gender = x.Gender,
                    Location = x.Location,
                    Type = x.Type
                }).ToListAsync();
                if (users.Count == 0)
                {
                    users = await _context.Users.Where(s => s.UserName.ToUpper().Contains(Find.ToUpper()) && s.Location == user_login.Location && s.IsDisabled == false).Select(x => new UserModel
                    {
                        StaffCode = x.StaffCode,
                        FullName = x.FirstName + " " + x.LastName,
                        UserName = x.UserName,
                        JoinedDate = x.JoinedDate,
                        DateofBirth = x.DateofBirth,
                        Gender = x.Gender,
                        Location = x.Location,
                        Type = x.Type
                    }).ToListAsync();
                }
            }
            return _mapper.Map<List<UserModel>>(users);
        }


        public async Task<List<UserModel>> GetAllAsync(int page, User user_login)
        {
            var users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
            {
                StaffCode = x.StaffCode,
                FullName = x.FirstName + " " + x.LastName,
                UserName = x.UserName,
                JoinedDate = x.JoinedDate,
                DateofBirth = x.DateofBirth,
                Gender = x.Gender,
                Location = x.Location,
                Type = x.Type
            }).ToListAsync();
            int uCount = users.Count();
            int totalPages = (uCount % 5 == 0) ? uCount / 5 : (uCount / 5) + 1;
            int offset = 5 * (page - 1);
            var res = users.Skip(offset).Take(5).ToList();
            if (page == 0)
            {
                return _mapper.Map<List<UserModel>>(users);
            }
            else
            {
                return _mapper.Map<List<UserModel>>(res);
            }
        }

        public async Task<List<UserModel>> GetUserByType(int page, string Type, User user_login)
        {
            var users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
            {
                StaffCode = x.StaffCode,
                FullName = x.FirstName + " " + x.LastName,
                UserName = x.UserName,
                JoinedDate = x.JoinedDate,
                DateofBirth = x.DateofBirth,
                Gender = x.Gender,
                Location = x.Location,
                Type = x.Type
            }).ToListAsync();
            if (Type != "")
            {
                if (Type == "Admin")
                {
                    users = await _context.Users.Where(x => x.Type == UserType.Admin && x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                    {
                        StaffCode = x.StaffCode,
                        FullName = x.FirstName + " " + x.LastName,
                        UserName = x.UserName,
                        JoinedDate = x.JoinedDate,
                        DateofBirth = x.DateofBirth,
                        Gender = x.Gender,
                        Location = x.Location,
                        Type = x.Type
                    }).ToListAsync();
                }
                else if (Type == "Staff")
                {
                    users = await _context.Users.Where(x => x.Type == UserType.Staff && x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                    {
                        StaffCode = x.StaffCode,
                        FullName = x.FirstName + " " + x.LastName,
                        UserName = x.UserName,
                        JoinedDate = x.JoinedDate,
                        DateofBirth = x.DateofBirth,
                        Gender = x.Gender,
                        Location = x.Location,
                        Type = x.Type
                    }).ToListAsync();
                }
                else
                {
                    users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                    {
                        StaffCode = x.StaffCode,
                        FullName = x.FirstName + " " + x.LastName,
                        UserName = x.UserName,
                        JoinedDate = x.JoinedDate,
                        DateofBirth = x.DateofBirth,
                        Gender = x.Gender,
                        Location = x.Location,
                        Type = x.Type
                    }).ToListAsync();
                }
            }
            else
            {
                users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                {
                    StaffCode = x.StaffCode,
                    FullName = x.FirstName + " " + x.LastName,
                    UserName = x.UserName,
                    JoinedDate = x.JoinedDate,
                    DateofBirth = x.DateofBirth,
                    Gender = x.Gender,
                    Location = x.Location,
                    Type = x.Type
                }).ToListAsync();
            }
            int uCount = users.Count();
            int totalPages = (uCount % 5 == 0) ? uCount / 5 : (uCount / 5) + 1;
            int offset = 5 * (page - 1);
            var res = users.Skip(offset).Take(5).ToList();
            if (page == 0)
            {
                return _mapper.Map<List<UserModel>>(users);
            }
            else
            {
                return _mapper.Map<List<UserModel>>(res);
            }
        }

        public async Task<List<UserModel>> SortUser(string Sort, User user_login, string Type, string Find)
        {
            var users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
            {
                StaffCode = x.StaffCode,
                FullName = x.FirstName + " " + x.LastName,
                UserName = x.UserName,
                JoinedDate = x.JoinedDate,
                DateofBirth = x.DateofBirth,
                Gender = x.Gender,
                Location = x.Location,
                Type = x.Type
            }).ToListAsync();
            switch (Sort)
            {
                case "Staff Code":
                    if (Type == "Admin")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Admin).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.StaffCode).ToListAsync();
                        break;
                    }
                    else if (Type == "Staff")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Staff).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.StaffCode).ToListAsync();
                        break;
                    }
                    else if (Type == "All")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.StaffCode).ToListAsync();
                        break;
                    }
                    else 
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location &&
                        x.IsDisabled == false &&
                        (x.FirstName.ToUpper().Contains(Find.ToUpper()) ||
                        x.StaffCode.ToUpper().Contains(Find.ToUpper()) ||
                        x.UserName.ToUpper().Contains(Find.ToUpper()))).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.StaffCode).ToListAsync();
                        break;
                    }
                case "Full Name":
                    if (Type == "Admin")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Admin).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.FullName).ToListAsync();
                        break;
                    }
                    else if (Type == "Staff")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Staff).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.FullName).ToListAsync();
                        break;
                    }
                    else if (Type == "All")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.FullName).ToListAsync();
                        break;
                    }
                    else
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location &&
                        x.IsDisabled == false &&
                        (x.FirstName.ToUpper().Contains(Find.ToUpper()) ||
                        x.StaffCode.ToUpper().Contains(Find.ToUpper()) ||
                        x.UserName.ToUpper().Contains(Find.ToUpper()))).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.FullName).ToListAsync();
                        break;
                    }
                case "Joined Date":
                    if (Type == "Admin")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Admin).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.JoinedDate).ToListAsync();
                        break;
                    }
                    else if (Type == "Staff")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Staff).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.JoinedDate).ToListAsync();
                        break;
                    }
                    else if (Type == "All")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.JoinedDate).ToListAsync();
                        break;
                    }
                    else
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location &&
                        x.IsDisabled == false &&
                        (x.FirstName.ToUpper().Contains(Find.ToUpper()) ||
                        x.StaffCode.ToUpper().Contains(Find.ToUpper()) ||
                        x.UserName.ToUpper().Contains(Find.ToUpper()))).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.JoinedDate).ToListAsync();
                        break;
                    }
                case "Type":
                    if (Type == "Admin")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Admin).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.Type).ToListAsync();
                        break;
                    }
                    else if (Type == "Staff")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false && x.Type == UserType.Staff).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.Type).ToListAsync();
                        break;
                    }
                    else if (Type == "All")
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location && x.IsDisabled == false).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.Type).ToListAsync();
                        break;
                    }
                    else 
                    {
                        users = await _context.Users.Where(x => x.Location == user_login.Location &&
                        x.IsDisabled == false &&
                        (x.FirstName.ToUpper().Contains(Find.ToUpper()) ||
                        x.StaffCode.ToUpper().Contains(Find.ToUpper()) ||
                        x.UserName.ToUpper().Contains(Find.ToUpper()))).Select(x => new UserModel
                        {
                            StaffCode = x.StaffCode,
                            FullName = x.FirstName + " " + x.LastName,
                            UserName = x.UserName,
                            JoinedDate = x.JoinedDate,
                            DateofBirth = x.DateofBirth,
                            Gender = x.Gender,
                            Location = x.Location,
                            Type = x.Type
                        }).OrderByDescending(o => o.Type).ToListAsync();
                        break;
                    }
            }
            return _mapper.Map<List<UserModel>>(users);
        }
        //_mapper.map<userviewmodel>(user);


    }
}
