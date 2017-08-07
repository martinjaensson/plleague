using Service.Dto;
using Service.Entities;
using System.Collections;
using System.Linq;

namespace Service.Translators
{
    public class UserTranslator
    {
        public static UserDto Translate(User user)
        {
            if (user == null)
                return null;

            return new UserDto
            {
                Username = user.Username,
                //Password = user.Information1,
                Role = user.Role != null ? user.Role.Text : "",
                EmployeeName = user.Name
            };
        }

    }
}
