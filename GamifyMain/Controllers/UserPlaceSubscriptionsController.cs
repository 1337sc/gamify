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
    public class UserPlaceSubscriptionsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public UserPlaceSubscriptionsController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/UserPlaceSubscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserPlaceSubscription>>> GetUserPlaceSubscriptions()
        {
            return await _context.UserPlaceSubscriptions.ToListAsync();
        }

        // GET: api/UserPlaceSubscriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserPlaceSubscription>> GetUserPlaceSubscription(int id)
        {
            var userPlaceSubscription = await _context.UserPlaceSubscriptions.FindAsync(id);

            if (userPlaceSubscription == null)
            {
                return NotFound();
            }

            return userPlaceSubscription;
        }

        // PUT: api/UserPlaceSubscriptions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserPlaceSubscription(int id, UserPlaceSubscription userPlaceSubscription)
        {
            if (id != userPlaceSubscription.Id)
            {
                return BadRequest();
            }

            _context.Entry(userPlaceSubscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPlaceSubscriptionExists(id))
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

        // POST: api/UserPlaceSubscriptions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserPlaceSubscription>> PostUserPlaceSubscription(UserPlaceSubscription userPlaceSubscription)
        {
            _context.UserPlaceSubscriptions.Add(userPlaceSubscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserPlaceSubscription", new { id = userPlaceSubscription.Id }, userPlaceSubscription);
        }

        // DELETE: api/UserPlaceSubscriptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserPlaceSubscription>> DeleteUserPlaceSubscription(int id)
        {
            var userPlaceSubscription = await _context.UserPlaceSubscriptions.FindAsync(id);
            if (userPlaceSubscription == null)
            {
                return NotFound();
            }

            _context.UserPlaceSubscriptions.Remove(userPlaceSubscription);
            await _context.SaveChangesAsync();

            return userPlaceSubscription;
        }

        private bool UserPlaceSubscriptionExists(int id)
        {
            return _context.UserPlaceSubscriptions.Any(e => e.Id == id);
        }
    }
}
