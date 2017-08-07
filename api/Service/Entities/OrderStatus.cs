using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{
    [Table("OrderStatus")]
    public class OrderStatus
    {
        [Key]
        [Column("TxtNo")]
        public int Group1 { get; set; }

        [Column("Txt")]
        public string Text_ { get; set; }

        [Column("TxtTp")]
        public Int64 TextType { get; set; }

    }

}
