using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GamifyMain.Models;

namespace GamifyMain.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Game> Games { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<GameInPlace> GamesInPlaces { get; set; }
        public DbSet<GameOfGenre> GamesOfGenres { get; set; }
        public DbSet<UserWishedGame> UsersWishedGames { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommentForPlace> CommentsForPlaces { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<UserPlaceSubscription> UserPlaceSubscriptions { get; set; }

        public ApplicationContext() : base() { }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}
