using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{
    [Table("PrDcMat")]
    public class Price
    {
        [Key]
        [Column("LnNo")]
        public int LineNo { get; set; }

        [Column("SalePr")]
        public decimal SalesPrice { get; set; }

        [Column("ProdNo")]
        public string ProductNo { get; set; }

        [Column("OrdNo")]
        public int OrderNo { get; set; }


    }
}
