
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
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RookieOnlineAssetManagement.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;


        public UsersController(SignInManager<User> signInManager, UserManager<User> userManager, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword(ChangePasswordModel changePasswordModel)
        {
            // Get user current login
            var user = await _userManager.GetUserAsync(User);

            if (user != null)
            {
                // Check compare old password vs new password
                if (changePasswordModel.OldPassword != changePasswordModel.NewPassword)
                {
                    // Check valid old password
                    bool isValidPassword = await _userManager.CheckPasswordAsync(user, changePasswordModel.OldPassword);
                    if (isValidPassword)
                    {

                        string pattern = @"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^\._-])(?!.*\s).{8,}$";
                        if (Regex.IsMatch(changePasswordModel.NewPassword, pattern))
                        {
                            var changePasswordResult = await _userManager.ChangePasswordAsync(user, changePasswordModel.OldPassword, changePasswordModel.NewPassword);
                            if (changePasswordResult.Succeeded)
                                return Ok("Your password has been changed successfully!");
                            //else
                            //    return BadRequest("Invalid new password");
                        }
                        else
                            return BadRequest("Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character");

                    }

                    else
                        return BadRequest("Password is incorrect");
                }
                else
                    return BadRequest("New password can't be match old password");
            }

            return BadRequest("Invalid User Login");
        }

        [HttpGet("Logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
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
        [HttpGet("Pagination/{page}/{Type}/{Find}/{Sort}")]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUserByType(int page = 0, string Type = "", string Find = "", string Sort = "")
        {
            var user_login = await _userManager.GetUserAsync(User);
            var list = await _userRepository.GetAllAsync(page, user_login);
            if (Type != "null" && Sort == "null" && Find == "null")
            {
                list = await _userRepository.GetUserByType(page, Type, user_login);
            }
            else if (Find != "null"&&Sort=="null"&&Type=="null")
            {
                list = await _userRepository.FindUser(Find, user_login);
            }
            else if (Sort != "null")
            {
                list = await _userRepository.SortUser(Sort, user_login, Type, Find);
            }
            return list;
        }
    }

}
