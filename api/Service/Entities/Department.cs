using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Service.Entities
{
    [Table("R1")]
    public class Department
    {
        [Key]
        [Column("RNo")]
        public int OrgUnit1No { get; set; }

        [Column("Nm")]
        public string Name { get; set; }

    }
}
