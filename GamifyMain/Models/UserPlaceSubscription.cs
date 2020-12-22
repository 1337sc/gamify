using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamifyMain.Models
{
    public class UserPlaceSubscription
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PlaceId { get; set; }
    }
}
