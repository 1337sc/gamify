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
    public class CommentsForPlacesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public CommentsForPlacesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/CommentsForPlacess
        [HttpGet]
        public async Task<object> GetCommentsForPlaces()
        {
            return await _context.CommentsForPlaces.ToListAsync();
        }

        // GET: api/CommentsForPlacess/5
        [HttpGet("{id}")]
        public async Task<object> GetCommentsForPlaces(int id)
        {
            var CommentsForPlaces = await _context.CommentsForPlaces.FindAsync(id);

            if (CommentsForPlaces == null)
            {
                return NotFound();
            }

            return CommentsForPlaces;
        }

        // PUT: api/CommentsForPlacess/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<object> PutCommentsForPlaces(int id, CommentForPlace CommentsForPlaces)
        {
            if (id != CommentsForPlaces.Id)
            {
                return BadRequest();
            }

            _context.Entry(CommentsForPlaces).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentForPlaceExists(id))
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

        // POST: api/CommentsForPlacess
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<object> PostCommentsForPlaces(CommentForPlace CommentsForPlaces)
        {
            _context.CommentsForPlaces.Add(CommentsForPlaces);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentsForPlaces", new { id = CommentsForPlaces.Id }, CommentsForPlaces);
        }

        // DELETE: api/CommentsForPlacess/5
        [HttpDelete("{id}")]
        public async Task<object> DeleteCommentsForPlaces(int id)
        {
            var CommentsForPlaces = await _context.CommentsForPlaces.FindAsync(id);
            if (CommentsForPlaces == null)
            {
                return NotFound();
            }

            _context.CommentsForPlaces.Remove(CommentsForPlaces);
            await _context.SaveChangesAsync();

            return CommentsForPlaces;
        }

        private bool CommentForPlaceExists(int id)
        {
            return _context.CommentsForPlaces.Any(e => e.Id == id);
        }
    }
}
