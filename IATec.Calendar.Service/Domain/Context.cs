using IATec.Calendar.Domain.Events.Entities;
using IATec.Calendar.Domain.UserEvents.Entities;
using IATec.Calendar.Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace IATec.Calendar.Domain
{
    [DbContext(typeof(Context))]
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<UserEntityDomain> Users { get; set; }
        public DbSet<EventEntityDomain> Events { get; set; }
        public DbSet<UserEventEntityDomain> UserEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEventEntityDomain>()
                .HasKey(ue => new { ue.UserId, ue.EventId });

            modelBuilder.Entity<UserEventEntityDomain>()
                .HasOne(ue => ue.User)
                .WithMany(u => u.Events)
                .HasForeignKey(ue => ue.UserId);

            modelBuilder.Entity<UserEventEntityDomain>()
                .HasOne(ue => ue.Event)
                .WithMany(e => e.Participants)
                .HasForeignKey(ue => ue.EventId);
        }
    }
}
