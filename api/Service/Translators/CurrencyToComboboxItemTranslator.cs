using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class CurrencyToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(Currency currency)
        {
            if (currency == null)
                return null;

            return new ComboboxItemDto
            {
                Id = currency.CurrencyNo,
                DisplayName = currency.IsoCode + " - " + currency.Name
            };
        }

    }
}