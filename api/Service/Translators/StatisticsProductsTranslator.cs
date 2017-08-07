using Service.Dto;
using Service.Entities;
using System.Collections.Generic;

namespace Service.Translators
{
    public class StatisticsProductsTranslator
    {
        public static StatisticsProductDto Translate(OrderLine orderLine)
        {
            if (orderLine == null)
                return null;

            return new StatisticsProductDto
            {
                OrderNo = orderLine.OrderNo,
                LineNo = orderLine.LineNo,
                ProductNo = orderLine.ProductNo,
                Description = orderLine.Description,
                Quantity = orderLine.Quantity,
                Price = orderLine.PriceInCurrency,
                Sum = orderLine.AmountInCurrency,
                Assortment = orderLine.ProductType3
            };
        }

    }
}
