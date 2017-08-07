using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Service.Entities
{
    [Table("Prod")]
    public class Product
    {
        [Key]
        [Column("ProdNo")]
        public string ProductNo { get; set; }

        [Column("Descr")]
        public string Description { get; set; }

        [Column("ProdTp3")]
        public int ProductType3 { get; set; }

        public virtual ICollection<Price> Prices { get; set; }

    }
}