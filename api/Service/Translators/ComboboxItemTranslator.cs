using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class ComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(ComboboxItem cbxItem)
        {
            if (cbxItem == null)
                return null;

            return new ComboboxItemDto
            {
                Id = cbxItem.TextNo,
                DisplayName = cbxItem.Text_
            };
        }

    }
}