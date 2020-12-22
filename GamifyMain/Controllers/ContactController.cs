using System;
using System.Linq;
using System.Threading.Tasks;
using GamifyMain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GamifyMain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ContactController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userId}")]
        public async Task<object> GetContactsByUser([FromRoute] int userId)
        {
            var user = await _context.Users
                .Include(x => x.Contacts)
                .ThenInclude(x => x.SecondUser)
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user.Contacts.Select(x => new UserContact
            {
                Name = x.SecondUser.Name,
                Id = x.SecondUser.Id.Value
            });
        }

        [HttpPost("{firstUserId}/with/{secondUserId}")]
        public async Task<object> CreateContact([FromRoute] int firstUserId, [FromRoute] int secondUserId)
        {
            if (firstUserId == default || secondUserId == default || firstUserId == secondUserId)
            {
                return BadRequest("First or second user id invalid");
            }

            var contact = new Contact
            {
                FirstUserId = firstUserId,
                SecondUserId = secondUserId
            };

            await _context.Contacts.AddAsync(contact);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{firstUserId}/with/{secondUserId}")]
        public async Task<object> DeleteContact([FromRoute] int firstUserId, [FromRoute] int secondUserId)
        {
            if (firstUserId == default || secondUserId == default || firstUserId == secondUserId)
            {
                return BadRequest("First or second user id invalid");
            }

            var contact = await _context
                .Contacts.FirstOrDefaultAsync(x => x.FirstUserId == firstUserId && x.SecondUserId == secondUserId);

            if (contact == null)
            {
                throw new Exception("Contact not found");
            }

            _context.Contacts.Remove(contact);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }

    public class UserContact
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}