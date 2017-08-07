import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { type } from '../utils';
import { Order, Project, HourlyRateProduct, StatisticsProduct} from '../../models';

export const ActionTypes = {
    SET:                             type('[Order] SET'),
    SET_SUCCESS:                     type('[Order] SET_SUCCESS'),
    SET_ERROR:                       type('[Order] SET_ERROR'),
    SAVE_PROJECT :                   type('[Order] SAVE_PROJECT'), 
    SAVE_PROJECT_SUCCESS :           type('[Order] SAVE_PROJECT_SUCCESS'),
    SAVE_PROJECT_ERROR :             type('[Order] SAVE_PROJECT_ERROR'),
    SAVE_ORDER :                     type('[Order] SAVE_ORDER'), 
    SAVE_ORDER_SUCCESS :             type('[Order] SAVE_ORDER_SUCCESS'),
    SAVE_ORDER_ERROR :               type('[Order] SAVE_ORDER_ERROR'),
    SAVE_CUSTOMER :                  type('[Order] SAVE_CUSTOMER'), 
    SAVE_CUSTOMER_SUCCESS :          type('[Order] SAVE_CUSTOMER_SUCCESS'),
    SAVE_CUSTOMER_ERROR :            type('[Order] SAVE_CUSTOMER_ERROR'),
    SAVE_PAYMENT_PLAN :              type('[Order] SAVE_PAYMENT_PLAN'), 
    SAVE_PAYMENT_PLAN_SUCCESS :      type('[Order] SAVE_PAYMENT_PLAN_SUCCESS'),
    SAVE_PAYMENT_PLAN_ERROR :        type('[Order] SAVE_PAYMENT_PLAN_ERROR'),
    ADD_PAYMENT_PLAN :               type('[Order] ADD_PAYMENT_PLAN'), 
    ADD_PAYMENT_PLAN_SUCCESS :       type('[Order] ADD_PAYMENT_PLAN_SUCCESS'),
    ADD_PAYMENT_PLAN_ERROR :         type('[Order] ADD_PAYMENT_PLAN_ERROR'),
    DELETE_PAYMENT_PLAN :            type('[Order] DELETE_PAYMENT_PLAN'), 
    DELETE_PAYMENT_PLAN_SUCCESS :    type('[Order] DELETE_PAYMENT_PLAN_SUCCESS'),
    DELETE_PAYMENT_PLAN_ERROR :      type('[Order] DELETE_PAYMENT_PLAN_ERROR'),
    SAVE_HOURLY_RATE_PRODUCT :           type('[Order] SAVE_HOURLY_RATE_PRODUCT'), 
    SAVE_HOURLY_RATE_PRODUCT_SUCCESS :   type('[Order] SAVE_HOURLY_RATE_PRODUCT_SUCCESS'),
    SAVE_HOURLY_RATE_PRODUCT_ERROR :     type('[Order] SAVE_HOURLY_RATE_PRODUCT_ERROR'),
    SAVE_STATISTICS_PRODUCT :                   type('[Order] SAVE_STATISTICS_PRODUCT'), 
    SAVE_STATISTICS_PRODUCT_SUCCESS :           type('[Order] SAVE_STATISTICS_PRODUCT_SUCCESS'),
    SAVE_STATISTICS_PRODUCT_ERROR :             type('[Order] SAVE_STATISTICS_PRODUCT_ERROR'),
    ADD_STATISTICS_PRODUCT :                    type('[Order] ADD_STATISTICS_PRODUCT'), 
    ADD_STATISTICS_PRODUCT_SUCCESS :            type('[Order] ADD_STATISTICS_PRODUCT_SUCCESS'),
    ADD_STATISTICS_PRODUCT_ERROR :              type('[Order] ADD_STATISTICS_PRODUCT_ERROR'),
    DELETE_STATISTICS_PRODUCT :                 type('[Order] DELETE_STATISTICS_PRODUCT'), 
    DELETE_STATISTICS_PRODUCT_SUCCESS :         type('[Order] DELETE_STATISTICS_PRODUCT_SUCCESS'),
    DELETE_STATISTICS_PRODUCT_ERROR :           type('[Order] DELETE_STATISTICS_PRODUCT_ERROR'),
    DELETE_ORDER :                              type('[Order] DELETE_ORDER'), 
    DELETE_ORDER_SUCCESS :                      type('[Order] DELETE_ORDER_SUCCESS'),
    DELETE_ORDER_ERROR :                        type('[Order] DELETE_ORDER_ERROR')
};

/**
 * Set
 */
export class Set implements Action {
    type = ActionTypes.SET;

    constructor(public payload: number) { }
}

export class SetSuccess implements Action {
    type = ActionTypes.SET_SUCCESS;

    constructor(public payload: Order) { }
}

export class SetError implements Action {
    type = ActionTypes.SET_ERROR;
}

/**
 * Save Project
 */
export class SaveProject implements Action {
    type = ActionTypes.SAVE_PROJECT;

    constructor(public payload: [number, Project]) {}
}

export class SaveProjectSuccess implements Action {
    type = ActionTypes.SAVE_PROJECT_SUCCESS;

    constructor(public payload: Order) {}
}

export class SaveProjectError implements Action {
    type = ActionTypes.SAVE_PROJECT_ERROR;
}

/**
 * Save Order
 */
export class SaveOrder implements Action {
    type = ActionTypes.SAVE_ORDER;

    constructor(public payload: Order) {}
}

export class SaveOrderSuccess implements Action {
    type = ActionTypes.SAVE_ORDER_SUCCESS;

    constructor(public payload: Order) {}
}

export class SaveOrderError implements Action {
    type = ActionTypes.SAVE_ORDER_ERROR;
}


/**
 * Save Customer
 */
export class SaveCustomer implements Action {
    type = ActionTypes.SAVE_CUSTOMER;

    constructor(public payload: Order) {}
}

export class SaveCustomerSuccess implements Action {
    type = ActionTypes.SAVE_CUSTOMER_SUCCESS;

    constructor(public payload: Order) {}
}

export class SaveCustomerError implements Action {
    type = ActionTypes.SAVE_CUSTOMER_ERROR;
}


/**
 * Save PaymentPlan
 */
export class SavePaymentPlan implements Action {
    type = ActionTypes.SAVE_PAYMENT_PLAN;

    constructor(public payload: Order) {}
}

export class SavePaymentPlanSuccess implements Action {
    type = ActionTypes.SAVE_PAYMENT_PLAN_SUCCESS;

    constructor(public payload: Order) {}
}

export class SavePaymentPlanError implements Action {
    type = ActionTypes.SAVE_PAYMENT_PLAN_ERROR;
}


/**
 * Add PaymentPlan
 */
export class AddPaymentPlan implements Action {
    type = ActionTypes.ADD_PAYMENT_PLAN;

    constructor(public payload: [number, number]) {}
}

export class AddPaymentPlanSuccess implements Action {
    type = ActionTypes.ADD_PAYMENT_PLAN_SUCCESS;

    constructor(public payload: Order) {}
}

export class AddPaymentPlanError implements Action {
    type = ActionTypes.ADD_PAYMENT_PLAN_ERROR;
}


/**
 * Delete PaymentPlan
 */
export class DeletePaymentPlan implements Action {
    type = ActionTypes.DELETE_PAYMENT_PLAN;

    constructor(public payload: [number, number]) {}
}

export class DeletePaymentPlanSuccess implements Action {
    type = ActionTypes.DELETE_PAYMENT_PLAN_SUCCESS;

    constructor(public payload: Order) {}
}

export class DeletePaymentPlanError implements Action {
    type = ActionTypes.DELETE_PAYMENT_PLAN_ERROR;
}


/**
 * Save Hourlyrate Product
 */
export class SaveHourlyRateProduct implements Action {
    type = ActionTypes.SAVE_HOURLY_RATE_PRODUCT;

    constructor(public payload: [number, HourlyRateProduct]) {}
}

export class SaveHourlyRateProductSuccess implements Action {
    type = ActionTypes.SAVE_HOURLY_RATE_PRODUCT_SUCCESS;

    constructor(public payload: Order) {}
}

export class SaveHourlyRateProductError implements Action {
    type = ActionTypes.SAVE_HOURLY_RATE_PRODUCT_ERROR;
}


/**
 * Save StatisticsProduct
 */
export class SaveStatisticsProduct implements Action {
    type = ActionTypes.SAVE_STATISTICS_PRODUCT

    constructor(public payload: [number, StatisticsProduct]) {}
}

export class SaveStatisticsProductSuccess implements Action {
    type = ActionTypes.SAVE_STATISTICS_PRODUCT_SUCCESS;

    constructor(public payload: Order) {}
}

export class SaveStatisticsProductError implements Action {
    type = ActionTypes.SAVE_STATISTICS_PRODUCT_ERROR;
}


/**
 * Add StatisticsProduct
 */
export class AddStatisticsProduct implements Action {
    type = ActionTypes.ADD_STATISTICS_PRODUCT;

    constructor(public payload: [number, string]) {}
}

export class AddStatisticsProductSuccess implements Action {
    type = ActionTypes.ADD_STATISTICS_PRODUCT_SUCCESS;

    constructor(public payload: Order) {}
}

export class AddStatisticsProductError implements Action {
    type = ActionTypes.ADD_STATISTICS_PRODUCT_ERROR;
}


/**
 * Delete StatisticsProduct
 */
export class DeleteStatisticsProduct implements Action {
    type = ActionTypes.DELETE_STATISTICS_PRODUCT;

    constructor(public payload: [number, number]) {}
}

export class DeleteStatisticsProductSuccess implements Action {
    type = ActionTypes.DELETE_STATISTICS_PRODUCT_SUCCESS;

    constructor(public payload: Order) {}
}

export class DeletStatisticsProductError implements Action {
    type = ActionTypes.DELETE_STATISTICS_PRODUCT_ERROR;
}


/**
 * Delete Order
 */
export class DeleteOrder implements Action {
    type = ActionTypes.DELETE_ORDER;

    constructor(public payload: number) {}
}

export class DeleteOrderSuccess implements Action {
    type = ActionTypes.DELETE_ORDER_SUCCESS;
}

export class DeleteOrderError implements Action {
    type = ActionTypes.DELETE_ORDER_ERROR;
}






