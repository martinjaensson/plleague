import { Action } from '@ngrx/store';

import { OrdersFilterState } from '../';

import * as ordersFilterActions from '../actions/orders-filter.actions';

let initialState: OrdersFilterState = {
    search: ''
};

export function reducer(state: OrdersFilterState = initialState, action: Action): OrdersFilterState {

    switch (action.type) {

        case ordersFilterActions.ActionTypes.SET_SEARCH: {
            return Object.assign({}, state, {
                search: action.payload ? action.payload.toLowerCase() : ''
            });
        }

        case ordersFilterActions.ActionTypes.CLEAR: {
            return initialState
        }
        
        default:
            return state;
    }
}