using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class UserToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(User user)
        {
            if (user == null)
                return null;

            return new ComboboxItemDto
            {
                Id = user.ActorNo,
                DisplayName = user.Name,
                Item = UserTranslator.Translate(user)
            };
        }

    }
}