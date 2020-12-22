using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamifyMain.Models;
using System.Web;
using GamifyMain.ViewModels;

namespace GamifyMain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UsersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<object> GetUsers(string name)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(user => user.Name.Contains(name));
            }

            return await query.ToListAsync();
        }

        [HttpGet("games")]
        public async Task<object> GetUserWithGames(string userName, int currentUserId)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrWhiteSpace(userName))
            {
                query = query.Where(user => user.Name.Contains(userName));
            }

            var userGameIds = await _context.UsersWishedGames
                .Where(g => g.UserId == currentUserId)
                .Select(g => g.GameId)
                .ToListAsync();

            return await query
                .Where(x => x.UserWishedGames.Any(g => userGameIds.Contains(g.GameId)))
                .Include(x => x.UserWishedGames)
                .ThenInclude(x => x.Game)
                .Select(x => new UserGames
                {
                    Email = x.Email,
                    Name = x.Name,
                    UserId = x.Id.Value,
                    Games = x.UserWishedGames.Select(g => g.Game).ToList()
                }).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<object> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/fromemail/123@example.com
        [HttpGet("fromemail/{email}")]
        public async Task<object> GetUserByEmail(string email)
        {
            var emailDecoded = HttpUtility.UrlDecode(email);
            var userQuery = from u in _context.Users where u.Email == emailDecoded select u;

            var user = await userQuery.SingleOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{id}/games")]
        public async Task<object> GetUserWishlist(int id)
        {
            return await (from g in _context.Games
                          join uwg in _context.UsersWishedGames on g.Id equals uwg.GameId
                          where uwg.UserId == id
                          select g).ToListAsync();
        }

        [HttpGet("{id}/subscriptions")]
        public async Task<object> GetUserSubscriptions(int id)
        {
            return await (from p in _context.Places
                          join ups in _context.UserPlaceSubscriptions on p.Id equals ups.PlaceId
                          where ups.UserId == id
                          select p).ToListAsync();
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<object> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<object> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }



        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
