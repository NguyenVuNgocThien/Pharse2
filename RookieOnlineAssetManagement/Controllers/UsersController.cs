
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
using RookieOnlineAssetManagement.Entities;
using RookieOnlineAssetManagement.Interface;
using RookieOnlineAssetManagement.Models;
using RookieOnlineAssetManagement.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;


        public UsersController(UserManager<User> userManager, IUserRepository userRepository)
        {
            //_logger = logger;
            _userRepository = userRepository;
            _userManager = userManager;
        }
        [HttpGet("CurrentUser")]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var currUser = await _userManager.GetUserAsync(User);
            return Ok(currUser);
        }

        [HttpGet("Current")]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get(int page)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.GetAllAsync(page, user_login);
        }
        [HttpGet("{Type}/{page}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserByType(int page, string Type)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.GetUserByType(page, Type, user_login);
        }
        [HttpGet("Find/{Find}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> FindUserByName(string Find)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.FindUser(Find, user_login);
        }
        //[HttpGet("Sort/{Sort}")]
        //public async Task<ActionResult<IEnumerable<UserModel>>> SortUser(string Sort)
        //{
        //    var user_login = await _userManager.GetUserAsync(User);
        //    return await _userRepository.SortUser(Sort, user_login);
        //}
        [HttpGet("Pagination/{page}/{Type}/{Find}/{Sort}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserByType(int page=0, string Type="",string Find="",string Sort="")
        {
            var user_login = await _userManager.GetUserAsync(User);
            var list = await _userRepository.GetAllAsync(page, user_login);
            if (Type != "null"&&Sort=="null"&&Find=="null")
            {
                list = await _userRepository.GetUserByType(page, Type, user_login);
            }
            else if (Find != "null")
            {
                list = await _userRepository.FindUser(Find, user_login);
            }
            else if (Sort != "null")
            {
                list = await _userRepository.SortUser(Sort, user_login,Type,Find);
            }
            return list;
        }
    }
}
