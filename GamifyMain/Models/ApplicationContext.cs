using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GamifyMain.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Place> Places { get; set; }

        public ApplicationContext() : base() { }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }
    }
}
