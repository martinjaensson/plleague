using Service.Dto;
using Service.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Service.Translators
{
    public class ProjectsToComboboxItemsTranslator
    {
        public static ComboboxItemsDto Translate(int cbxItemType , ICollection<Project> projects)
        {
            if (projects == null)
                return null;

            return new ComboboxItemsDto
            {
                CbxItemType = cbxItemType,
                List = projects.Select(ProjectToComboboxItemTranslator.Translate).ToList()
            };
        }

    }
}
