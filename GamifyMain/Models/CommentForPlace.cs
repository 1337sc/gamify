using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamifyMain.Models
{
    public class CommentForPlace
    {
        public int Id { get; set; }
        public int PlaceId { get; set; }
        public int CommentId { get; set; }
    }
}
