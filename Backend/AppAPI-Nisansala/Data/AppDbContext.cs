using AppAPI_Nisansala.Models;
using Microsoft.EntityFrameworkCore;

namespace AppAPI_Nisansala.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Course>().HasKey(c => c.CourseId);
            modelBuilder.Entity<User>().HasKey(u => u.UserId);

            modelBuilder.Entity<Course>()
                 .Property(f => f.CourseId)
                 .ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                 .Property(f => f.UserId)
                 .ValueGeneratedOnAdd();

        }
    }
}
