using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;


namespace Service.Translators
{
    public class HourlyRateProductTranslator
    {
        public static HourlyRateProductDto Translate(Product product, int orderNo)
        {
            if (product == null)
                return null;

            return new HourlyRateProductDto
            {
                ProductNo = product.ProductNo,
                Description = product.Description,
                SalesPrice = product.Prices.Where(p => p.ProductNo == product.ProductNo && p.OrderNo == orderNo).Select(pr => pr.SalesPrice).ToList().Count() < 1 ? 
                                                    product.Prices.Where(p => p.ProductNo == product.ProductNo && p.OrderNo == 0).Select(pr => pr.SalesPrice).FirstOrDefault() :
                                                    product.Prices.Where(p => p.ProductNo == product.ProductNo && p.OrderNo == orderNo).Select(pr => pr.SalesPrice).FirstOrDefault()
            };
        }

    }
}

