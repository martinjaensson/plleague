using Service.Dto;
using Service.Entities;
using System.Collections;
using System.Linq;

namespace Service.Translators
{
    public class CustomerTranslator
    {
        public static CustomerDto Translate(Customer customer)
        {
            if (customer == null)
                return null;

            return new CustomerDto
            {
                Id = customer.CustomerNo,
                Name = customer.Name,
                CustomerNo = customer.CustomerNo,
                SellerOrBuyer = customer.Seller,
                Department = customer.OrgUnit1,
                CurrencyNo = customer.Currency,
                PaymentTerms = customer.PaymentTermsForCustomer,
                CustomersReference = customer.YourReference
            };
        }

    }
}
