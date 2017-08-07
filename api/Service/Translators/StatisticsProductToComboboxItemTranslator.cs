using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class StatisticsProductToComboboxItemTranslator
    {
        public static ComboboxItemWithStringIdDto Translate(Product statisticsProduct)
        {
            if (statisticsProduct == null)
                return null;

            return new ComboboxItemWithStringIdDto
            {
                Id = statisticsProduct.ProductNo,
                DisplayName = statisticsProduct.ProductNo + " - " + statisticsProduct.Description
            };
        }

    }
}