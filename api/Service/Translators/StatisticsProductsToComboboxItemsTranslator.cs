using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class StatisticsProductsToComboboxItemsTranslator
    {
        public static ComboboxItemsWithStringIdDto Translate(int cbxItemType, ICollection<Product> statisticsProducts)
        {
            if (statisticsProducts == null)
                return null;

            return new ComboboxItemsWithStringIdDto
            {
                CbxItemType = cbxItemType,
                List = statisticsProducts.Select(StatisticsProductToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
