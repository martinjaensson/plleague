using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Entities
{

    [Table("R2")]
    public class Project
    {
        [Key]
        [Column("RNo")]
        public int OrgUnit2No { get; set; }

        [Column("Nm")]
        public string Name { get; set; }

        [Column("Rsp")]
        public int ActorNo { get; set; }

        [Column("ActNo1")]
        public int AssociateNo1 { get; set; }

        [Column("ActNo2")]
        public int AssociateNo2 { get; set; }

        [Column("ActNo3")]
        public int AssociateNo3 { get; set; }

        [Column("NoteNm")]
        public string MemoFileName { get; set; }

        public virtual User ProjectLeader { get; set; }

    }
}
