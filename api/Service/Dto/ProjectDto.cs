using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProjectLeaderNo { get; set; }

        public UserDto ProjectLeader { get; set; }

        public int EndCustomerNo { get; set; }

        public int OEMNo { get; set; }

        public int AgentNo { get; set; }

        public string MemoFilePath { get; set; }

        public string Comment { get; set; }
    }
}
