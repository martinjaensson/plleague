using Common;
using Service.Dto;
using Service.Entities;
using Service.Exceptions;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Vb;
using Visma.BusinessModel;

namespace Service.Translators
{
    public class OrderTranslator
    {
        public static OrderDto Translate(Order order, ICollection<Product> hourlyRateProducts, bool multipleOrders)
        {
            if (order == null)
                return null;

            if (!multipleOrders)
            {
                return new OrderDto
                {
                    Id = order.OrderNo,
                    Name = order.Information3,
                    OrderDate = Utils.IntegerDateConverter.IntergerToDateTime(order.OrderDate),
                    CustomerNo = order.CustomerNo,
                    Customer = CustomerTranslator.Translate(order.Customer),
                    SellerOrBuyer = order.SellerOrBuyer,
                    PaymentTerms = order.PaymentTerms,
                    CurrencyNo = order.CurrencyNo,
                    CustomerOrderNo = order.Information1,
                    Department = order.OrgUnit1,
                    CustomersReference = order.YourReference,
                    OrderStatusNo = order.Group1,
                    OrderStatus = OrderStatusTranslator.Translate(order.OrderStatus),
                    OrderType = order.TransactionGroup1,
                    IncomeType = order.TransactionGroup2,
                    OrderValue = order.ContractAmountInCurrency,
                    ProjectNo = order.OrgUnit2No,
                    Project = ProjectTranslator.Translate(order.Project, multipleOrders),
                    PaymentPlan = order.PaymentPlan != null ? order.PaymentPlan.Where(oL => oL.ProductNo.Equals("20")).Select(oL => PaymentPlanTranslator.Translate(oL)).OrderBy(p => p.LineNo).ToList() : null,
                    StatisticsProducts = order.StatisticsProducts != null ? order.StatisticsProducts.Where(oL => oL.ProductType3 == 2 || oL.ProductType3 == 1).Select(oL => StatisticsProductsTranslator.Translate(oL)).OrderBy(p => p.LineNo).ToList() : null,
                    HourlyRateProducts = hourlyRateProducts != null ? hourlyRateProducts.Select(p => HourlyRateProductTranslator.Translate(p, order.OrderNo)).ToList() : null,
                    MemoFilePath = File.Exists(order.MemoFileName) ? order.MemoFileName : generateNewFilePath(order.OrderNo),
                    Comment = readFromFileOrCreateNewIfMissing(order.MemoFileName, order.OrderNo)
                };
            }
            else {
                return new OrderDto
                {
                    Id = order.OrderNo,
                    Name = order.Information3,
                    //OrderDate = Utils.IntegerDateConverter.IntergerToDateTime(order.OrderDate),
                    CustomerNo = order.CustomerNo,
                    Customer = CustomerTranslator.Translate(order.Customer),
                    //SellerOrBuyer = order.SellerOrBuyer,
                    //PaymentTerms = order.PaymentTerms,
                    //CurrencyNo = order.CurrencyNo,
                    //CustomerOrderNo = order.Information1,
                    //Department = order.OrgUnit1,
                    //CustomersReference = order.YourReference,
                    OrderStatusNo = order.Group1,
                    OrderStatus = OrderStatusTranslator.Translate(order.OrderStatus),
                    //OrderType = order.TransactionGroup1,
                    //IncomeType = order.TransactionGroup2,
                    //OrderValue = order.ContractAmountInCurrency,
                    ProjectNo = order.OrgUnit2No,
                    Project = ProjectTranslator.Translate(order.Project, multipleOrders),
                    //PaymentPlan = order.PaymentPlan != null ? order.PaymentPlan.Where(oL => oL.ProductNo.Equals("20")).Select(oL => PaymentPlanTranslator.Translate(oL)).OrderBy(p => p.LineNo).ToList() : null,
                    //StatisticsProducts = order.StatisticsProducts != null ? order.StatisticsProducts.Where(oL => oL.ProductType3 == 2 || oL.ProductType3 == 1).Select(oL => StatisticsProductsTranslator.Translate(oL)).OrderBy(p => p.LineNo).ToList() : null,
                    //HourlyRateProducts = hourlyRateProducts != null ? hourlyRateProducts.Select(p => HourlyRateProductTranslator.Translate(p, order.OrderNo)).ToList() : null,
                    //MemoFilePath = File.Exists(order.MemoFileName) ? order.MemoFileName : generateNewFilePath(order.OrderNo),
                    //Comment = readFromFileOrCreateNewIfMissing(order.MemoFileName, order.OrderNo)
                };
            } 

        }

        private static string readFromFileOrCreateNewIfMissing(string filePath, int id)
        {
            if (!File.Exists(filePath))
            {
                var newFilePath = generateNewFilePath(id);
                writeFilePathToProject(newFilePath, id);
                File.Create(newFilePath).Close();
                return "";
            }
            else
            {
                return Utils.ReadWriteFile.ReadTxtFile(filePath);
            }
        }

        private static string generateNewFilePath(int id)
        {
            return Config.VbFilePath + "OrderComment" + id + ".txt";
        }

        private static void writeFilePathToProject(string filePath, int id)
        {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.Order);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.Order.OrderNo, id);

                var row = rowSelection.Row;
                row.SetStringValue((long)C.Order.MemoFileName, filePath);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }
        }

    }
}
