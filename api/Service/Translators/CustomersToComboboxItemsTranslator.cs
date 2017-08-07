using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class CustomersToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<Customer> customers)
        {
            if (customers == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = customers.Select(CustomerToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
