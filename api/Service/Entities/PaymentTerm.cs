using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Service.Entities
{
    [Table("PmtTrm")]
    public class PaymentTerm
    {
        [Key]
        [Column("PmtTrmNo")]
        public int PaymentTerms { get; set; }

        [Column("Descr")]
        public string Description { get; set; }

    }
}
