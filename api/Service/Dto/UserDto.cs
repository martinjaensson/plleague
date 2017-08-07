using Service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string EmployeeName { get; set; }
    }
}
