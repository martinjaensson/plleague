using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class DepartmentsToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType, ICollection<Department> departments)
        {
            if (departments == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = departments.Select(DepartmentToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
