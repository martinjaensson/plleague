using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class DepartmentToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(Department department)
        {
            if (department == null)
                return null;

            return new ComboboxItemDto
            {
                Id = department.OrgUnit1No,
                DisplayName = department.Name
            };
        }

    }
}