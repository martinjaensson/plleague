using Api.Filters;
using Api.Models;
using Service.Dto;
using Service.Services;
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
    public class OrderController : ApiController
    {

        [Route("Orders")]
        public async Task<HttpResponseMessage> GetOrders()
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orders = await service.getOrders();
                return Request.CreateResponse(ApiResponse.Create(orders));
            }
        }

        [Route("Order/{orderNo}")]
        public async Task<HttpResponseMessage> GetOrder(int orderNo)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var order = await service.getOrder(orderNo);
                return Request.CreateResponse(ApiResponse.Create(order));
            }
        }

        ///// <summary>
        ///// Save ProjectInformation
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="project"></param>
        ///// <returns>order</returns>
        [Route("Project/{orderNo}/Save")]
        public async Task<HttpResponseMessage> Post(int orderNo, ProjectDto projectIn)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SaveProject(orderNo, projectIn);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }

        ///// <summary>
        ///// Save OrderInformation
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("Order/{orderNo}/Save")]
        public async Task<HttpResponseMessage> Post(int orderNo, OrderDto orderIn)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SaveOrder(orderNo, orderIn);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Save CustomerInformation
        ///// </summary>
        ///// <param name="orderId"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("Customer/{orderNo}/Save")]
        public async Task<HttpResponseMessage> PostCustomer(int orderNo, OrderDto orderIn)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SaveCustomer(orderNo, orderIn);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Save PaymentPlan
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("PaymentPlan/{orderNo}/Save")]
        public async Task<HttpResponseMessage> PostSavePaymentPlan(int orderNo, OrderDto orderIn)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SavePaymentPlan(orderNo, orderIn);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Add PaymentPlan
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="percent"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("PaymentPlan/{orderNo}/Add/{percent}")]
        public async Task<HttpResponseMessage> GetAddPaymentPlan(int orderNo, int percent)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.AddPaymentPlan(orderNo, percent);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Delete PaymentPlan
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="lineNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("PaymentPlan/{orderNo}/Delete/{lineNo}")]
        public async Task<HttpResponseMessage> GetDeletePaymentPlan(int orderNo, int lineNo)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.DeletePaymentPlan(orderNo, lineNo);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }

        ///// <summary>
        ///// save HourlyRate Product
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="HourlyRateProduct"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("HourlyRateProduct/{orderNo}/Save")]
        public async Task<HttpResponseMessage> PostSaveHourlyRateProduct(int orderNo, HourlyRateProductDto hourlyRateProduct)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SaveHourlyRateProduct(orderNo, hourlyRateProduct);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Save StatisticsProduct
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("StatisticsProduct/{orderNo}/Save")]
        public async Task<HttpResponseMessage> PostSaveStatisticsProduct(int orderNo, StatisticsProductDto product)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.SaveStatisticsProduct(orderNo, product);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Add Product
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="prodNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("StatisticsProduct/{orderNo}/Add/{prodNo}")]
        public async Task<HttpResponseMessage> GetAddStatisticsProduct(int orderNo, string prodNo)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.AddStatisticsProduct(orderNo, prodNo);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Delete StatisticsProduct
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <param name="lineNo"></param>
        ///// <param name="order"></param>
        ///// <returns>order</returns>
        [Route("StatisticsProduct/{orderNo}/Delete/{lineNo}")]
        public async Task<HttpResponseMessage> GetDeleteStatisticsProduct(int orderNo, int lineNo)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderOut = await service.DeleteStatisticsProduct(orderNo, lineNo);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderOut));
            }
        }


        ///// <summary>
        ///// Create New Order
        ///// </summary>
        ///// <returns>orderNo</returns>
        [Route("CreateNewOrder")]
        public async Task<HttpResponseMessage> GetCreateNewOrder()
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var orderNo = await service.CreateNewOrder();
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(orderNo));
            }
        }

        ///// <summary>
        ///// Delete Order
        ///// </summary>
        ///// <param name="orderNo"></param>
        ///// <returns>boolean</returns>
        [Route("DeleteOrder/{orderNo}")]
        public async Task<HttpResponseMessage> GetDeleteOrder(int orderNo)
        {
            using (var service = new OrderService(RequestContext.Principal.Identity))
            {
                var succeded = await service.DeleteOrder(orderNo);
                return Request.CreateResponse(HttpStatusCode.Created, ApiResponse.Create(succeded));
            }
        }

    }
}
