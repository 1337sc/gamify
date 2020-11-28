using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamifyMain.Models
{
    public class GameInPlace
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int PlaceId { get; set; }
    }
}
