using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class ComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<ComboboxItem> cbxItems)
        {
            if (cbxItems == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = cbxItems.Select(ComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
