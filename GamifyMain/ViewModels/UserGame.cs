using System.Collections.Generic;
using GamifyMain.Models;

namespace GamifyMain.ViewModels
{
    public class UserGames
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public List<Game> Games { get; set; }
    }
}