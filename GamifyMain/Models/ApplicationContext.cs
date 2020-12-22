using Microsoft.EntityFrameworkCore;

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

        public DbSet<Contact> Contacts { get; set; }

        public ApplicationContext() : base() { }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .HasOne(x => x.FirstUser)
                .WithMany(x => x.Contacts)
                .HasForeignKey(x => x.FirstUserId)
                .HasPrincipalKey(x => x.Id);

            modelBuilder.Entity<Contact>()
                .HasOne(x => x.SecondUser)
                .WithMany()
                .HasForeignKey(x => x.SecondUserId).OnDelete(DeleteBehavior.NoAction)
                .HasPrincipalKey(x => x.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
