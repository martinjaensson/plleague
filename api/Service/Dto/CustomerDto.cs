using Service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CustomerNo { get; set; }
        public int SellerOrBuyer { get; set; }
        public int PaymentTerms { get; set; }
        public int CurrencyNo { get; set; }
        public int Department { get; set; }
        public string CustomersReference { get; set; }
    }
}
