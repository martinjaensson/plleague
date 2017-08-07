import { Action } from '@ngrx/store';
import { OrdersState } from '../';
import { Order } from '../../models';

import * as ordersActions from '../actions/orders.actions';

let initialState: OrdersState = {
    loading: false,
    list:  null,
    page: 1
};

export function reducer(state = initialState, action: Action): OrdersState {
  switch (action.type) {
        case ordersActions.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case ordersActions.ActionTypes.LOAD_SUCCESS: {
            return Object.assign({}, state, {
                loading: false,
                list: action.payload
            });
        }

        case ordersActions.ActionTypes.LOAD_ERROR: {
            return Object.assign({}, state, {
                loading: false
            });
        }

                /**
         * Pages
         */
        case ordersActions.ActionTypes.PAGE_PREV: {
            return Object.assign({}, state, {
                page: state.page - 1
            });
        }

        case ordersActions.ActionTypes.PAGE_NEXT: {
            return Object.assign({}, state, {
                page: state.page + 1
            });
        }

        case ordersActions.ActionTypes.PAGE_SET: {
            return Object.assign({}, state, {
                page: action.payload
            });
        }


        case ordersActions.ActionTypes.CREATE_NEW_ORDER: {
            return Object.assign({}, state, {
                loading: true
            });
        }
    
        case ordersActions.ActionTypes.CREATE_NEW_ORDER_SUCCESS:
        case ordersActions.ActionTypes.CREATE_NEW_ORDER_ERROR: {
            return Object.assign({}, state, {
                loading: false
            });
        }


        default:
            return state;
    }
}
