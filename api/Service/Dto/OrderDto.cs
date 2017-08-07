using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? OrderDate { get; set; }
        public int ProjectNo { get; set; }
        public ProjectDto Project { get; set;}
        public int CustomerNo { get; set; }
        public CustomerDto Customer{ get; set; }
        public int SellerOrBuyer { get; set; }
        public int PaymentTerms { get; set; }
        public int CurrencyNo { get; set; }
        public string CustomerOrderNo { get; set; }
        public int Department { get; set; }
        public string CustomersReference { get; set; }
        public int OrderStatusNo { get; set; }
        public OrderStatusDto OrderStatus { get; set; }
        public int OrderType { get; set; }
        public int IncomeType { get; set; }
        public decimal OrderValue { get; set; }
        public string MemoFilePath { get; set; }
        public string Comment { get; set; }
        public ICollection<PaymentPlanDto> PaymentPlan { get; set; }
        public ICollection<StatisticsProductDto> StatisticsProducts { get; set; }
        public ICollection<HourlyRateProductDto>  HourlyRateProducts { get; set; }
    }
}
