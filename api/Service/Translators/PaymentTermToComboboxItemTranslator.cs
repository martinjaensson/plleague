using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class PaymentTermToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(PaymentTerm paymentTerm)
        {
            if (paymentTerm == null)
                return null;

            return new ComboboxItemDto
            {
                Id = paymentTerm.PaymentTerms,
                DisplayName = paymentTerm.Description
            };
        }

    }
}