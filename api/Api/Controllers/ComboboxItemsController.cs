using Api.Filters;
using Api.Models;
using Service.Services;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace Api.Controllers
{
    [AuthenticationFilter]
    [Authorize]
    public class ComboboxItemsController : ApiController
    {

        [Route("ComboboxItems")]
        public async Task<HttpResponseMessage> Post(ICollection<int> cbxItemTypeNumbers)
        {
            using (var service = new ComboboxItemsService(RequestContext.Principal.Identity))
            {
                var comboboxItems = await service.getComboboxItems(cbxItemTypeNumbers);
              return Request.CreateResponse(ApiResponse.Create(comboboxItems));
            }
        }


    }
}
