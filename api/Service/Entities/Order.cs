using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{

    [Table("Ord")]
    public class Order
    {
        [Key]
        [Column("OrdNo")]
        public int OrderNo { get; set; }

        [Column("Inf3")]
        public string Information3 { get; set; }

        [Column("OrdDt")]
        public int OrderDate { get; set; }

        [Column("CustNo")]
        public int CustomerNo { get; set; }

        [Column("SelBuy")]
        public int SellerOrBuyer { get; set; }

        [Column("PmtTrm")]
        public int PaymentTerms { get; set; }

        [Column("Cur")]
        public int CurrencyNo{ get; set; }

        [Column("Inf")]
        public string Information1 { get; set; }

        [Column("R1")]
        public int OrgUnit1 { get; set; }

        [Column("YrRef")]
        public string YourReference { get; set; }

        [ForeignKey("OrderStatus")]
        [Column("Gr")]
        public int Group1 { get; set; }

        [Column("TransGr")]
        public int TransactionGroup1 { get; set; }

        [Column("TransGr2")]
        public int TransactionGroup2 { get; set; }

        [Column("CtrAm")]
        public decimal ContractAmountInCurrency { get; set; }

        [ForeignKey("Project")]
        [Column("R2")]
        public int OrgUnit2No { get; set; }

        [Column("NoteNm")]
        public string MemoFileName { get; set; }

        public virtual Project Project { get; set; }

        public virtual Customer Customer { get; set; }

        public virtual OrderStatus OrderStatus { get; set; }

        public virtual ICollection<OrderLine> PaymentPlan { get; set; }

        public virtual ICollection<OrderLine> StatisticsProducts { get; set; }


    }
}
