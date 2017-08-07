using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class HourlyRateProductDto
    {
        public string ProductNo { get; set; }

        public string Description { get; set; }
        public decimal SalesPrice { get; set; }

        public int OrderNo { get; set; }

    }
}
