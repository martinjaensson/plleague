using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{
    [Table("Customers")]
    public class Customer
    {

        [Key]
        [Column("CustNo")]
        public int CustomerNo { get; set; }

        [Column("ActNo")]
        public int ActorNo { get; set; }

        [Column("Nm")]
        public string Name { get; set; }

        [Column("Seller")]
        public int Seller { get; set; }

        [Column("CPmtTrm")]
        public int PaymentTermsForCustomer { get; set; }

        [Column("Cur")]
        public int Currency { get; set; }

        [Column("R1")]
        public int OrgUnit1 { get; set; }

        [Column("YrRef")]
        public string YourReference { get; set; }

    }
}