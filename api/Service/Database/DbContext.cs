using Service.Entities;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Security.Principal;
using System.Threading.Tasks;

namespace Service.Database
{
    public class DbContext : System.Data.Entity.DbContext
    {
        public DbContext(IIdentity authenticatedUser)
        {
            _authenticatedUser = authenticatedUser;

            // Log all database access.
            // TODO: Put this as configuration setting and use a logging fwk instead of standard out.
            Database.Log = Console.Write;
        }

        private readonly IIdentity _authenticatedUser;

        private const string DatabaseSchema = "dbo";

        // Work-around to ensure that the provider DLL is included.
        // This is needed to ensure that the provider DLL is included for other projects referencing this assembly.
        public bool InstanceExists => System.Data.Entity.SqlServer.SqlProviderServices.Instance != null;

        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ComboboxItem> ComboboxItems { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<PaymentTerm> PaymentTerms { get; set; }

        public DbSet<Currency> Currencies { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Price> Prices { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Configure code conventions
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Add(new DateTime2Convention());
            modelBuilder.HasDefaultSchema(DatabaseSchema);

            // Build the model by adding all classes implementing EntityTypeConfiguration<T>
            modelBuilder.Configurations.AddFromAssembly(GetType().Assembly);
        }


        /// <summary>
        /// Ensures that all DateTime properties are mapped to DateTime2 (instead of the default mapping to datetime).
        /// </summary>
        public class DateTime2Convention : Convention
        {
            public DateTime2Convention()
            {
                Properties<DateTime>().Configure(c => c.HasColumnType("datetime2"));
            }
        }
    }
}