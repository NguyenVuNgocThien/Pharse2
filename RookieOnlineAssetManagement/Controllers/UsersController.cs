using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RookieOnlineAssetManagement.Data;
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
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserRepository _userRepository;

        public UsersController(ILogger<UsersController> logger, IUserRepository userRepository)
        {
            _logger = logger;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Get(int page)
        {
            return await _userRepository.GetAllAsync(page);
        }
        [HttpGet("{Type}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserByType(string Type)
        {
            return await _userRepository.GetUserByType(Type);
        }
        [HttpGet("Find/{Find}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> FindUserByName(string Find)
        {
            return await _userRepository.FindUser(Find);
        }
        [HttpGet("Sort/{Sort}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> SortUser(string Sort)
        {
            return await _userRepository.SortUser(Sort);
        }
    }
}
