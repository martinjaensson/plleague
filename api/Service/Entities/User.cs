using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Service.Entities
{
    [Table("Actor")]
    public class User
    {
        [Key]
        [Column("ActNo")]
        public int ActorNo { get; set; }

        [Column("Usr")]
        public string Username { get; set; }

        [Column("Nm")]
        public string Name { get; set; }

        [Column("Inf")]
        public string Information1 { get; set; }

        [Column("Gr")]
        public int TextNo { get; set; }
        public virtual Role Role { get; set; }
  
        [Column("EmpNo")]
        public int EmployeeNo { get; set; }

    }
}
