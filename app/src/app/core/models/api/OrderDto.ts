import { Project } from './ProjectDto';
import { PaymentPlan } from './PaymentPlanDto';
import { StatisticsProduct } from './StatisticsProductsDto';
import { HourlyRateProduct } from './HourlyRateProductDto';
import { Customer } from './CustomerDto';
import { OrderStatus } from './OrderStatusDto';

/** 
	* Class Order generated from Service.Dto.OrderDto 
	*/
export class Order  { 
	
    public id: number;
	
    public name: string;
	
    public orderDate: Date;
	
    public projectNo: number;
	
    public project: Project;
	
    public customerNo: number;
	
    public customer: Customer;
	
    public sellerOrBuyer: number;
	
    public paymentTerms: number;
	
    public currencyNo: number;
	
    public customerOrderNo: string;
	
    public department: number;
	
    public customersReference: string;
	
    public orderStatusNo: number;
	
    public orderStatus: OrderStatus;
	
    public orderType: number;
	
    public incomeType: number;
	
    public orderValue: number;
	
    public memoFilePath: string;
	
    public comment: string;
	
    public paymentPlan: PaymentPlan[];
	
    public statisticsProducts: StatisticsProduct[];
	
    public hourlyRateProducts: HourlyRateProduct[];
	
}


