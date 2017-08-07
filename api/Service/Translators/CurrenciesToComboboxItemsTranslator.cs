using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class CurrenciesToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<Currency> currencies)
        {
            if (currencies == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = currencies.Select(CurrencyToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
