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
    public class GamesInPlacesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public GamesInPlacesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/GameInPlaces
        [HttpGet]
        public async Task<object> GetGamesInPlaces()
        {
            return await _context.GamesInPlaces.ToListAsync();
        }

        // GET: api/GameInPlaces/5
        [HttpGet("{id}")]
        public async Task<object> GetGameInPlace(int id)
        {
            var gameInPlace = await _context.GamesInPlaces.FindAsync(id);

            if (gameInPlace == null)
            {
                return NotFound();
            }

            return gameInPlace;
        }

        // PUT: api/GameInPlaces/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<object> PutGameInPlace(int id, GameInPlace gameInPlace)
        {
            if (id != gameInPlace.Id)
            {
                return BadRequest();
            }

            _context.Entry(gameInPlace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameInPlaceExists(id))
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

        // POST: api/GameInPlaces
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<object> PostGameInPlace(GameInPlace gameInPlace)
        {
            _context.GamesInPlaces.Add(gameInPlace);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameInPlace", new { id = gameInPlace.Id }, gameInPlace);
        }

        // DELETE: api/GameInPlaces/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteGameInPlace(int id)
        {
            var gameInPlace = await _context.GamesInPlaces.FindAsync(id);
            if (gameInPlace == null)
            {
                return NotFound();
            }

            _context.GamesInPlaces.Remove(gameInPlace);
            await _context.SaveChangesAsync();

            return gameInPlace;
        }

        private bool GameInPlaceExists(int id)
        {
            return _context.GamesInPlaces.Any(e => e.Id == id);
        }
    }
}
