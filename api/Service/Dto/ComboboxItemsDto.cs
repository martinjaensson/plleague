using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class ComboboxItemsDto
    {
        public int CbxItemType { get; set; }

        public ICollection<ComboboxItemDto> List { get; set; }

        public ComboboxItemTypeEnum PeriodType { get; set; }

        public enum ComboboxItemTypeEnum
        {
            Projects,
            Employees,
            Users,
            OrderStatus,
            OrderTypes,
            IncomeTypes,
            Customers,
            PaymentTerms,
            Currencies,
            Departments,
            StatisticsProducts
        }
    }
}
