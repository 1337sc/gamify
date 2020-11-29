using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamifyMain.Models;

namespace GamifyMain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersWishedGamesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UsersWishedGamesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/UserWishedGames
        [HttpGet]
        public async Task<object> GetUsersWishedGames()
        {
            return await _context.UsersWishedGames.ToListAsync();
        }

        // GET: api/UserWishedGames/5
        [HttpGet("{id}")]
        public async Task<object> GetUserWishedGame(int id)
        {
            var userWishedGame = await _context.UsersWishedGames.FindAsync(id);

            if (userWishedGame == null)
            {
                return NotFound();
            }

            return userWishedGame;
        }

        // PUT: api/UserWishedGames/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<object> PutUserWishedGame(int id, UserWishedGame userWishedGame)
        {
            if (id != userWishedGame.Id)
            {
                return BadRequest();
            }

            _context.Entry(userWishedGame).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserWishedGameExists(id))
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

        // POST: api/UserWishedGames
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<object> PostUserWishedGame(UserWishedGame userWishedGame)
        {
            _context.UsersWishedGames.Add(userWishedGame);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserWishedGame", new { id = userWishedGame.Id }, userWishedGame);
        }

        // DELETE: api/UserWishedGames/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteUserWishedGame(int id)
        {
            var userWishedGame = await _context.UsersWishedGames.FindAsync(id);
            if (userWishedGame == null)
            {
                return NotFound();
            }

            _context.UsersWishedGames.Remove(userWishedGame);
            await _context.SaveChangesAsync();

            return userWishedGame;
        }

        private bool UserWishedGameExists(int id)
        {
            return _context.UsersWishedGames.Any(e => e.Id == id);
        }
    }
}
