using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamifyMain.Models
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double CoordLat { get; set; }
        public double CoordLon { get; set; }
        public int OwnerId { get; set; }
    }
}
