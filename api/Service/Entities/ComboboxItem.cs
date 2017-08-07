using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{
    [Table("ComboboxItems")]
    public class ComboboxItem
    {
        [Key]
        [Column("TxtNo", Order = 1)]
        public int TextNo { get; set; }

        [Key]
        [Column("LnNo", Order = 2)]
        public int LineNo { get; set; }

        [Column("Txt")]
        public string Text_ { get; set; }

        [Column("TxtTp")]
        public Int64 TextType { get; set; }

    }

}
