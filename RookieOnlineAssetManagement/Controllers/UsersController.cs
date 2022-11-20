
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


        public UsersController( UserManager<User> userManager, IUserRepository userRepository)
        {
            //_logger = logger;
            _userRepository = userRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get(int page)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.GetAllAsync(page, user_login);
        }
        [HttpGet("{Type}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserByType(string Type)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.GetUserByType(Type, user_login);
        }
        [HttpGet("Find/{Find}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> FindUserByName(string Find)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.FindUser(Find, user_login);
        }
        [HttpGet("Sort/{Sort}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> SortUser(string Sort)
        {
            var user_login = await _userManager.GetUserAsync(User);
            return await _userRepository.SortUser(Sort, user_login);
        }
    }
}
