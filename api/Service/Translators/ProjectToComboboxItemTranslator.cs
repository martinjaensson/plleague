using Service.Dto;
using Service.Entities;

namespace Service.Translators
{
    public class ProjectToComboboxItemTranslator
    {
        public static ComboboxItemDto Translate(Project project)
        {
            if (project == null)
                return null;

            return new ComboboxItemDto
            {
               Id = project.OrgUnit2No,
               DisplayName = project.OrgUnit2No + " - " + project.Name,
               Item = ProjectTranslator.Translate(project, false)
            };
        }

    }
}
