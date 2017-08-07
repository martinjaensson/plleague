using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Service.Entities
{
    [Table("OrdLn")]
    public class OrderLine
    {
        [Key]
        [Column("OrdNo", Order = 1)]
        public int OrderNo { get; set; }

        [Key]
        [Column("LnNo", Order = 2)]
        public int LineNo { get; set; }

        [Column("ProdTp3")]
        public int ProductType3 { get; set; }

        [Column("ProdNo")]
        public string ProductNo { get; set; }

        [Column("Descr")]
        public string Description { get; set; }

        [Column("NoInvoAb")]
        public decimal Quantity { get; set; }

        [Column("Price")]
        public decimal PriceInCurrency { get; set; }

        [Column("LstSetDt")]
        public int SettlementDate { get; set; }

        [Column("FinN")]
        public decimal FinishNow { get; set; }

        [Column("NoFin")]
        public decimal Finished { get; set; }

        [Column("NoInvo")]
        public decimal InvoicedOrRealised { get; set; }

        [Column("Am")]
        public decimal AmountInCurrency { get; set; }

    }
}
