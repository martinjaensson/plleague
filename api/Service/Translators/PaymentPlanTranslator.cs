using Service.Dto;
using Service.Entities;
using System.Collections.Generic;

namespace Service.Translators
{
    public class PaymentPlanTranslator
    {
        public static PaymentPlanDto Translate(OrderLine orderLine)
        {
            if (orderLine == null)
                return null;

            return new PaymentPlanDto
            {
                OrderNo = orderLine.OrderNo,
                LineNo = orderLine.LineNo,
                ProductNo = orderLine.ProductNo,
                Description = orderLine.Description,
                Quantity = orderLine.Quantity,
                Sum = orderLine.PriceInCurrency,
                InvoiceDate = Utils.IntegerDateConverter.IntergerToDateTime(orderLine.SettlementDate),
                FinishNow = orderLine.FinishNow,
                Finished = orderLine.Finished,
                InvoicedOrRealised = orderLine.InvoicedOrRealised
            };
        }

    }
}
