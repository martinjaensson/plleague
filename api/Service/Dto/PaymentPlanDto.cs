using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class PaymentPlanDto
    {
        public int OrderNo { get; set; }
        public int LineNo { get; set; }
        public string ProductNo { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public decimal Sum { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal FinishNow { get; set; }
        public decimal Finished { get; set; }
        public decimal InvoicedOrRealised { get; set; }

    }
}
