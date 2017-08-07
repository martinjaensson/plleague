using Service.Dto;
using Service.Entities;
using System.Collections;
using System.Linq;

namespace Service.Translators
{
    public class OrderStatusTranslator
    {
        public static OrderStatusDto Translate(OrderStatus orderStatus)
        {
            if (orderStatus == null)
                return null;

            return new OrderStatusDto
            {
                Id = orderStatus.Group1,
                Name = orderStatus.Text_
            };
        }

    }
}
