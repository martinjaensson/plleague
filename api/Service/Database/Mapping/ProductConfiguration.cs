using Service.Entities;
using System.Data.Entity.ModelConfiguration;
using System;

namespace Service.Database.Mapping
{
    public class ProductConfiguration : EntityTypeConfiguration<Product>
    {
        public ProductConfiguration()
        {
            HasMany(o => o.Prices)
                .WithRequired()
                .HasForeignKey(o => o.ProductNo);
        }
    }
}