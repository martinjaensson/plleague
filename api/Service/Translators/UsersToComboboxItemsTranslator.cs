using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class UsersToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<User> users)
        {
            if (users == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = users.Select(UserToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
