using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class CustomerToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(Customer customer)
        {
            if (customer == null)
                return null;

            return new ComboboxItemDto
            {
                Id = customer.CustomerNo,
                DisplayName = customer.Name,
                Item = CustomerTranslator.Translate(customer)
            };
        }

    }
}