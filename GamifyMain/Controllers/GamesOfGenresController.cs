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
    public class GamesOfGenresController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public GamesOfGenresController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/GamesOfGenres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameOfGenre>>> GetGamesOfGenres()
        {
            return await _context.GamesOfGenres.ToListAsync();
        }

        // GET: api/GamesOfGenres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameOfGenre>> GetGameOfGenre(int id)
        {
            var gameOfGenre = await _context.GamesOfGenres.FindAsync(id);

            if (gameOfGenre == null)
            {
                return NotFound();
            }

            return gameOfGenre;
        }

        // PUT: api/GamesOfGenres/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGameOfGenre(int id, GameOfGenre gameOfGenre)
        {
            if (id != gameOfGenre.Id)
            {
                return BadRequest();
            }

            _context.Entry(gameOfGenre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameOfGenreExists(id))
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

        // POST: api/GamesOfGenres
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<GameOfGenre>> PostGameOfGenre(GameOfGenre gameOfGenre)
        {
            _context.GamesOfGenres.Add(gameOfGenre);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameOfGenre", new { id = gameOfGenre.Id }, gameOfGenre);
        }

        // DELETE: api/GamesOfGenres/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<GameOfGenre>> DeleteGameOfGenre(int id)
        {
            var gameOfGenre = await _context.GamesOfGenres.FindAsync(id);
            if (gameOfGenre == null)
            {
                return NotFound();
            }

            _context.GamesOfGenres.Remove(gameOfGenre);
            await _context.SaveChangesAsync();

            return gameOfGenre;
        }

        private bool GameOfGenreExists(int id)
        {
            return _context.GamesOfGenres.Any(e => e.Id == id);
        }
    }
}
