using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Dto
{
    public class ComboboxItemsWithStringIdDto : ComboboxItemsDto
    {
        public ICollection<ComboboxItemWithStringIdDto> List { get; set; }
    }
}
