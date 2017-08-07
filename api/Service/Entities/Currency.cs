using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Service.Entities
{
    [Table("Cur")]
    public class Currency
    {
        [Key]
        [Column("CurNo")]
        public int CurrencyNo { get; set; }

        [Column("ISO")]
        public string IsoCode { get; set; }

        [Column("Nm")]
        public string Name { get; set; }

    }
}
