using Service.Dto;
using Service.Translators;
using System.Data.Entity;
using System.Security.Principal;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.Services
{
    public class ComboboxItemsService : BaseService
    {
        public ComboboxItemsService(IIdentity authenticatedUser)
            : base(authenticatedUser) { }

        public async Task<ComboboxItemsDto> getComboboxItem(int cbxItemType)
        {
            if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Projects)
            {
                var projects = await DatabaseContext.Projects.ToListAsync();
                return ProjectsToComboboxItemsTranslator.Translate(cbxItemType, projects);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Employees)
            {
                var users = await DatabaseContext.Users.Where(u => u.EmployeeNo != 0).ToListAsync();
                return UsersToComboboxItemsTranslator.Translate(cbxItemType, users);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Users)
            {
                var users = await DatabaseContext.Users.ToListAsync();
                return UsersToComboboxItemsTranslator.Translate(cbxItemType, users);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.OrderStatus)
            {
                var cbxItems = await DatabaseContext.ComboboxItems.Where(c => c.TextType == 48).ToListAsync();
                return ComboboxItemsTranslator.Translate(cbxItemType, cbxItems);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.OrderTypes)
            {
                var cbxItems = await DatabaseContext.ComboboxItems.Where(t => t.TextType == 20).ToListAsync();
                return ComboboxItemsTranslator.Translate(cbxItemType, cbxItems);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.IncomeTypes)
            {
                var cbxItems = await DatabaseContext.ComboboxItems.Where(t => t.TextType == 59).ToListAsync();
                return ComboboxItemsTranslator.Translate(cbxItemType, cbxItems);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Customers)
            {
                var customers = await DatabaseContext.Customers.Where(c => c.CustomerNo != 0).ToListAsync();
                return CustomersToComboboxItemsTranslator.Translate(cbxItemType, customers);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.PaymentTerms)
            {
                var paymentTerms = await DatabaseContext.PaymentTerms.ToListAsync();
                return PaymentTermsToComboboxItemsTranslator.Translate(cbxItemType, paymentTerms);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Currencies)
            {
                var currencies = await DatabaseContext.Currencies.ToListAsync();
                return CurrenciesToComboboxItemsTranslator.Translate(cbxItemType, currencies);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.Departments)
            {
                var departments = await DatabaseContext.Departments.ToListAsync();
                return DepartmentsToComboboxItemsTranslator.Translate(cbxItemType, departments);
            }
            else if (cbxItemType == (int)ComboboxItemsDto.ComboboxItemTypeEnum.StatisticsProducts)
            {
                var statisticsProducts = await DatabaseContext.Products.Where(p => p.ProductType3 == 1 || p.ProductType3 == 2).ToListAsync();
                return StatisticsProductsToComboboxItemsTranslator.Translate(cbxItemType, statisticsProducts);
            }
            else {
                return null;
            }
        }

        public async Task<ICollection<ComboboxItemsDto>> getComboboxItems(ICollection<int> cbxItemTypeNumbers)
        {
            List<ComboboxItemsDto> comboboxItems = new List<ComboboxItemsDto>();
            foreach (int cbxItemTypeNo in cbxItemTypeNumbers)
            {
                comboboxItems.Add(await getComboboxItem(cbxItemTypeNo));
            }
            return comboboxItems;
        }
    }
}
