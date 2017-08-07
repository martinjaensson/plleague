using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Service.Entities
{
    [Table("Role")]
    public class Role
    {
        [Key]
        [Column("TxtNo")]
        public int TextNo { get; set; }
        [Column("Txt")]
        public string Text { get; set; }
    }
}