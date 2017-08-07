using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class PaymentTermsToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<PaymentTerm> paymentTerms)
        {
            if (paymentTerms == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = paymentTerms.Select(PaymentTermToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
