import { Action } from '@ngrx/store';

import { OrderState } from '../';
import { Order, PaymentPlan } from '../../models';

import * as orderActions from '../actions/order.actions';

let initialState: OrderState = {
    loading: false,
    item: null,
};

export function reducer(state: OrderState = initialState, action: Action): OrderState {

    switch (action.type) {
        
        case orderActions.ActionTypes.DELETE_ORDER:
        case orderActions.ActionTypes.SET: {
            return Object.assign({}, state, {
                loading: true,
            });
        }
        
        case orderActions.ActionTypes.SET_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                item: action.payload
            });
        }
        
        case orderActions.ActionTypes.DELETE_ORDER_SUCCESS:
        case orderActions.ActionTypes.DELETE_ORDER_ERROR:
        case orderActions.ActionTypes.SET_ERROR:
        case orderActions.ActionTypes.SAVE_ORDER_ERROR:
        case orderActions.ActionTypes.SAVE_CUSTOMER_ERROR:
        case orderActions.ActionTypes.SAVE_PROJECT_ERROR: {
            return Object.assign({}, state, {
                loading: false
            });
        }
        
        case orderActions.ActionTypes.SAVE_PROJECT:
        case orderActions.ActionTypes.SAVE_CUSTOMER:
        case orderActions.ActionTypes.SAVE_ORDER: {
            return Object.assign({}, state, {
                loading: true,
                item: action.payload
            });
        }
        
        case orderActions.ActionTypes.SAVE_PROJECT_SUCCESS:
        case orderActions.ActionTypes.SAVE_CUSTOMER_SUCCESS:
        case orderActions.ActionTypes.SAVE_ORDER_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                item: action.payload
            });
        }
        

        case orderActions.ActionTypes.SAVE_PAYMENT_PLAN: {
            return Object.assign({}, state, {
                item: action.payload
            });
        }
        
        
        case orderActions.ActionTypes.DELETE_STATISTICS_PRODUCT_SUCCESS:
        case orderActions.ActionTypes.ADD_STATISTICS_PRODUCT_SUCCESS:
        case orderActions.ActionTypes.SAVE_STATISTICS_PRODUCT_SUCCESS:
        case orderActions.ActionTypes.SAVE_HOURLY_RATE_PRODUCT_SUCCESS:
        case orderActions.ActionTypes.DELETE_PAYMENT_PLAN_SUCCESS:
        case orderActions.ActionTypes.ADD_PAYMENT_PLAN_SUCCESS:
        case orderActions.ActionTypes.SAVE_PAYMENT_PLAN_SUCCESS: {
            return Object.assign({}, state, {
                item: action.payload
            });
        }
    
        // Nothing happening for these case
        // ERROR 
        case orderActions.ActionTypes.DELETE_STATISTICS_PRODUCT_ERROR:
        case orderActions.ActionTypes.ADD_STATISTICS_PRODUCT_ERROR:
        case orderActions.ActionTypes.SAVE_STATISTICS_PRODUCT_ERROR:
        case orderActions.ActionTypes.SAVE_HOURLY_RATE_PRODUCT_ERROR:
        case orderActions.ActionTypes.DELETE_PAYMENT_PLAN_ERROR:
        case orderActions.ActionTypes.ADD_PAYMENT_PLAN_ERROR:
        case orderActions.ActionTypes.SAVE_PAYMENT_PLAN_ERROR: 
        
        // ADD, SAVE, DELETE
        case orderActions.ActionTypes.DELETE_STATISTICS_PRODUCT:
        case orderActions.ActionTypes.ADD_STATISTICS_PRODUCT:
        case orderActions.ActionTypes.ADD_PAYMENT_PLAN:
        case orderActions.ActionTypes.DELETE_PAYMENT_PLAN:
        case orderActions.ActionTypes.SAVE_STATISTICS_PRODUCT:
        case orderActions.ActionTypes.SAVE_HOURLY_RATE_PRODUCT:
        
        default:
            return state;
    }

}