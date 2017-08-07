using Service.Entities;
using System.Data.Entity.ModelConfiguration;
using System;

namespace Service.Database.Mapping
{
    public class OrderConfiguration : EntityTypeConfiguration<Order>
    {
        public OrderConfiguration()
        {
            HasMany(o => o.PaymentPlan)
                .WithRequired()
                .HasForeignKey(o => o.OrderNo);

            HasMany(o => o.StatisticsProducts)
                .WithRequired()
                .HasForeignKey(o => o.OrderNo);

        }
    }
}
