using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamifyMain.Models;
using System.Diagnostics;

namespace GamifyMain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public PlacesController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Places
        [HttpGet]
        public async Task<object> GetPlaces()
        {
            return await _context.Places.ToListAsync();
        }

        // GET: api/Places/owner/5
        [HttpGet("owner/{ownerId}")]
        public async Task<object> GetPlacesByOwnerId(int ownerId)
        {
            var places = from p in _context.Places where p.OwnerId == ownerId select p;

            return await places.ToListAsync();
        }

        // GET: api/Places/radius/100,50.432,50.567
        [HttpGet("radius/{radius},{userLat},{userLong}")]
        public async Task<object> GetPlacesInRadius(double radius, double userLat, double userLong)
        {
            var radiusRounded = Math.Round(radius, 4);
            var userLatRounded = Math.Round(userLat, 4);
            var userLongRounded = Math.Round(userLong, 4);

            var places = from p in _context.Places
                         where Math.Acos(
                                  Math.Sin(p.CoordLat * 0.0175) * Math.Sin(userLatRounded * 0.0175)
                                + Math.Cos(p.CoordLat * 0.0175) * Math.Cos(userLatRounded * 0.0175)
                                * Math.Cos((userLongRounded * 0.0175) - (p.CoordLon * 0.0175))
                            ) * 6371 <= radiusRounded
                         select p;

            return await places.ToListAsync();
        }

        // GET: api/Places/5
        [HttpGet("{id}")]
        public async Task<object> GetPlace(int id)
        {
            var place = await _context.Places.FindAsync(id);

            if (place == null)
            {
                return NotFound();
            }

            return place;
        }

        [HttpGet("{id}/games")]
        public async Task<object> GetPlaceGames(int id)
        {
            return await (from g in _context.Games
                          join gip in _context.GamesInPlaces on g.Id equals gip.GameId
                          where gip.PlaceId == id
                          select g).ToListAsync();
        }

        [HttpGet("search/{name}")]
        public async Task<object> GetPlacesByName(string name)
        {
            return await (from p in _context.Places 
                          where p.Name.ToLower().Contains(name.ToLower()) 
                          select p).ToListAsync();
        }

        [HttpGet("{id}/comments")]
        public async Task<object> GetPlaceComments(int id)
        {
            return await (from c in _context.Comments
                          join cfp in _context.CommentsForPlaces on c.Id equals cfp.CommentId
                          where cfp.PlaceId == id
                          select c).ToListAsync();
        }

        // PUT: api/Places/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<object> PutPlace(int id, Place place)
        {
            if (id != place.Id)
            {
                return BadRequest();
            }

            _context.Entry(place).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceExists(id))
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

        // POST: api/Places
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<object> PostPlace(Place place)
        {
            Debug.WriteLine($"{place.Id}\n" +
                $"{place.OwnerId}\n" +
                $"{place.Name}");
            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlace", new { id = place.Id }, place);
        }

        // DELETE: api/Places/5
        [HttpDelete("{id}")]
        public async Task<object> DeletePlace(int id)
        {
            var place = await _context.Places.FindAsync(id);
            if (place == null)
            {
                return NotFound();
            }

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();

            return place;
        }

        private bool PlaceExists(int id)
        {
            return _context.Places.Any(e => e.Id == id);
        }
    }
}
