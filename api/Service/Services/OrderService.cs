using Service.Dto;
using Service.Translators;
using System.Data.Entity;
using System.Security.Principal;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using Vb;
using Visma.BusinessModel;
using Service.Exceptions;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using Visma.BusinessServices.Generic;

namespace Service.Services
{
    public class OrderService : BaseService
    {
        public OrderService(IIdentity authenticatedUser)
            : base(authenticatedUser) { }

        public async Task<ICollection<OrderDto>> getOrders()
        {
            var orders = await DatabaseContext.Orders.ToListAsync();
            //var hourlyRateProducts = await DatabaseContext.Products.Where(p => p.ProductType3 == 3).ToListAsync();

            return orders.Select(o => OrderTranslator.Translate(o, null, true)).ToList();
        }

        public async Task<OrderDto> getOrder(int orderNo)
        {
            var order = await DatabaseContext.Orders.Where(o => o.OrderNo == orderNo).FirstOrDefaultAsync();
            var hourlyRateProducts = await DatabaseContext.Products.Where(p => p.ProductType3 == 3).OrderBy(p => p.ProductNo).ToListAsync();

            return OrderTranslator.Translate(order, hourlyRateProducts, false);
        }

        public async Task<OrderDto> SaveProject(int orderNo, ProjectDto projectIn)
        {

            var department = await DatabaseContext.Orders.Where(o => o.OrderNo == orderNo).Select(o => o.OrgUnit1).FirstOrDefaultAsync();

            // Changing project changes
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrgUnit2);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.OrgUnit2.OrgUnit2No, projectIn.Id);

                var row = rowSelection.Row;
                row.SetStringValue((long)C.OrgUnit2.Name, projectIn.Name);
                row.SetIntegerValue((long)C.OrgUnit2.Official, projectIn.ProjectLeaderNo);
                row.SetIntegerValue((long)C.OrgUnit2.AssociateNo1, projectIn.EndCustomerNo);
                row.SetIntegerValue((long)C.OrgUnit2.AssociateNo2, projectIn.OEMNo);
                row.SetIntegerValue((long)C.OrgUnit2.AssociateNo3, projectIn.AgentNo);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            // Saving project on order
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.Order.OrderNo, orderNo);

                var row = rowSelection.Row;
                row.SetIntegerValue((long)C.Order.OrgUnit2, projectIn.Id);
                row.SetIntegerValue((long)C.Order.OrgUnit1, department);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            // Write Comment
            var project = await DatabaseContext.Projects.Where(p => p.OrgUnit2No == projectIn.Id).FirstOrDefaultAsync();
            Utils.ReadWriteFile.WriteToTxtFile(projectIn.Comment, project.MemoFileName);

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> SaveOrder(int orderNo, OrderDto orderIn)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.Order.OrderNo, orderNo);

                var row = rowSelection.Row;
                row.SetStringValue((long)C.Order.Information3, orderIn.Name);
                row.SetIntegerValue((long)C.Order.OrderDate, Utils.IntegerDateConverter.DateTimeToInteger(orderIn.OrderDate));
                row.SetDecimalValue((long)C.Order.ContractAmountInCurrency, orderIn.OrderValue);
                row.SetIntegerValue((long)C.Order.Group1, orderIn.OrderStatusNo);
                row.SetIntegerValue((long)C.Order.TransactionGroup1, orderIn.OrderType);
                row.SetIntegerValue((long)C.Order.TransactionGroup2, orderIn.IncomeType);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            // Write Comment
            var order = await DatabaseContext.Orders.Where(o => o.OrderNo == orderNo).FirstOrDefaultAsync();
            Utils.ReadWriteFile.WriteToTxtFile(orderIn.Comment, order.MemoFileName);

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> SaveCustomer(int orderNo, OrderDto orderIn)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.Order.OrderNo, orderNo);

                var row = rowSelection.Row;
                row.SetIntegerValue((long)C.Order.CustomerNo, orderIn.CustomerNo);
                row.SetIntegerValue((long)C.Order.SellerOrBuyer, orderIn.SellerOrBuyer);
                row.SetIntegerValue((long)C.Order.PaymentTerms, orderIn.PaymentTerms);
                row.SetIntegerValue((long)C.Order.CurrencyNo, orderIn.CurrencyNo);
                row.SetStringValue((long)C.Order.Information1, orderIn.CustomerOrderNo);
                row.SetStringValue((long)C.Order.YourReference, orderIn.CustomersReference);
                row.SetIntegerValue((long)C.Order.OrgUnit2, orderIn.ProjectNo);
                row.SetIntegerValue((long)C.Order.OrgUnit1, orderIn.Department);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> SavePaymentPlan(int orderNo, OrderDto orderIn)
        {
            using (var vb = new VbClient())
            {

                var tableHandler = vb.Context.UseTable((long)T.OrderLine);
                foreach (PaymentPlanDto paymentPlan in orderIn.PaymentPlan)
                {

                    var rowSelection = tableHandler.SelectRow();
                    rowSelection.IntegerColumnValue((long)C.OrderLine.OrderNo, orderNo);
                    rowSelection.And();
                    rowSelection.IntegerColumnValue((long)C.OrderLine.LineNo, paymentPlan.LineNo);

                    var row = rowSelection.Row;
                    row.SetStringValue((long)C.OrderLine.Description, paymentPlan.Description);
                    row.SetDecimalValue((long)C.OrderLine.PriceInCurrency, paymentPlan.Sum);
                    row.SetIntegerValue((long)C.OrderLine.SettlementDate, Utils.IntegerDateConverter.DateTimeToInteger(paymentPlan.InvoiceDate));
                    var res = vb.Dispatch();

                    if (!res.AllSucceeded)
                        throw new ErpException(vb.GetErrorMessage());
                }
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> AddPaymentPlan(int orderNo, int percent)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrderLine);
                var row = tableHandler.AddRow();
                row.SetIntegerValue((long)C.OrderLine.OrderNo, orderNo);
                row.SetStringValue((long)C.OrderLine.ProductNo, "20");
                row.SetIntegerValue((long)C.OrderLine.Quantity, 1);
                row.SetDecimalValue((long)C.OrderLine.PriceInCurrency, percent);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> DeletePaymentPlan(int orderNo, int lineNo)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrderLine);
                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.OrderLine.OrderNo, orderNo);
                rowSelection.And();
                rowSelection.IntegerColumnValue((long)C.OrderLine.LineNo, lineNo);
                rowSelection.Row.Delete();

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<int> CreateNewOrder()
        {
            var orderNo = 0;
            // Create new row
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);

                var row = tableHandler.AddRow();
                row.SuggestValue((long)C.Order.OrderNo);
                row.SetStringValue((long)C.Order.Information3, "Nytt delprojekt");

                var projection = row.ProjectColumns();
                projection.AddColumn((long)C.Order.OrderNo);


                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());

                // Investigate the projection result
                foreach (var result in res.OperationResultDictionary.Values)
                {
                    if (result is ProjectionResult)
                    {
                        var projectionResult = result as ProjectionResult;
                        var resultRow = projectionResult.ResultSet.ResultRows[0];
                        orderNo = (int)resultRow.Values[0];
                    }
                }
            }
            return orderNo;
        }

        public async Task<bool> DeleteOrder(int orderNo)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);
                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.Order.OrderNo, orderNo);
                rowSelection.Row.Delete();

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }
            return true;

        }

        public async Task<OrderDto> SaveHourlyRateProduct(int orderNo, HourlyRateProductDto hourlyRateProduct)
        {
            DeleteHourlyRateProduct(orderNo, hourlyRateProduct);
            AddHourlyRateProduct(orderNo, hourlyRateProduct);
            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        private void AddHourlyRateProduct(int orderNo, HourlyRateProductDto hourlyRateProduct)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.PriceAndDiscountMatrix);
                var row = tableHandler.AddRow();
                row.SetIntegerValue((long)C.PriceAndDiscountMatrix.OrderNo, orderNo);
                row.SetStringValue((long)C.PriceAndDiscountMatrix.ProductNo, hourlyRateProduct.ProductNo);
                row.SetDecimalValue((long)C.PriceAndDiscountMatrix.SalesPrice1InCurrency, hourlyRateProduct.SalesPrice);
                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }
        }

        private void DeleteHourlyRateProduct(int orderNo, HourlyRateProductDto hourlyRateProduct)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.PriceAndDiscountMatrix);
                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.PriceAndDiscountMatrix.OrderNo, orderNo);
                rowSelection.And();
                rowSelection.StringColumnValue((long)C.PriceAndDiscountMatrix.ProductNo, hourlyRateProduct.ProductNo);
                rowSelection.Row.Delete();

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }
        }


        public async Task<OrderDto> SaveStatisticsProduct(int orderNo, StatisticsProductDto statisticsProduct)
        {
            using (var vb = new VbClient())
            {

                var tableHandler = vb.Context.UseTable((long)T.OrderLine);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.OrderLine.OrderNo, orderNo);
                rowSelection.And();
                rowSelection.IntegerColumnValue((long)C.OrderLine.LineNo, statisticsProduct.LineNo);

                var row = rowSelection.Row;
                row.SetDecimalValue((long)C.OrderLine.Quantity, statisticsProduct.Quantity);
                if (statisticsProduct.Price != -1)
                    row.SetDecimalValue((long)C.OrderLine.PriceInCurrency, statisticsProduct.Price);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());

            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> AddStatisticsProduct(int orderNo, string prodNo)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrderLine);
                var row = tableHandler.AddRow();
                row.SetIntegerValue((long)C.OrderLine.OrderNo, orderNo);
                row.SetStringValue((long)C.OrderLine.ProductNo, prodNo);
                row.SetIntegerValue((long)C.OrderLine.Quantity, 1);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }

        public async Task<OrderDto> DeleteStatisticsProduct(int orderNo, int lineNo)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrderLine);
                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.OrderLine.OrderNo, orderNo);
                rowSelection.And();
                rowSelection.IntegerColumnValue((long)C.OrderLine.LineNo, lineNo);
                rowSelection.Row.Delete();

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }

            var orderOut = await getOrder(orderNo);
            return orderOut;
        }
    }
}
