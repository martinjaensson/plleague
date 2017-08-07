import { Action } from '@ngrx/store';
import { ComboboxItemsState } from '../';
import { ComboboxItem, ComboboxItemType } from '../../models';

import * as comboboxItemsActions from '../actions/comboboxitems.actions';

let initialState: ComboboxItemsState = {
    loading: false,
    projects: null,
    employees: null,
    users: null,
    orderStatus: null,
    orderTypes: null,
    incomeTypes: null,
    customers: null,
    paymentTerms: null,
    currencies: null,
    departments: null,
    statisticsProducts: null
};


export function reducer(state = initialState, action: Action): ComboboxItemsState {
    switch (action.type) {
        case comboboxItemsActions.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case comboboxItemsActions.ActionTypes.LOAD_SUCCESS: {
            for (let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].cbxItemType == ComboboxItemType.projects) {
                    state = Object.assign({}, state, {
                        loading: false,
                        projects: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.employees) {
                    state = Object.assign({}, state, {
                        loading: false,
                        employees: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.users) {
                    state = Object.assign({}, state, {
                        loading: false,
                        users: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.orderStatus) {
                    state = Object.assign({}, state, {
                        loading: false,
                        orderStatus: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.orderTypes) {
                    state = Object.assign({}, state, {
                        loading: false,
                        orderTypes: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.incomeTypes) {
                    state = Object.assign({}, state, {
                        loading: false,
                        incomeTypes: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.customers) {
                    state = Object.assign({}, state, {
                        loading: false,
                        customers: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.paymentTerms) {
                    state = Object.assign({}, state, {
                        loading: false,
                        paymentTerms: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.currencies) {
                    state = Object.assign({}, state, {
                        loading: false,
                        currencies: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.departments) {
                    state = Object.assign({}, state, {
                        loading: false,
                        departments: action.payload[i]
                    });
                } else if (action.payload[i].cbxItemType == ComboboxItemType.statisticsProducts) {
                    state = Object.assign({}, state, {
                        loading: false,
                        statisticsProducts: action.payload[i]
                    });
                    
                }
            }
            return state;
        }

        case comboboxItemsActions.ActionTypes.LOAD_ERROR: {
            return Object.assign({}, state, {
                loading: false
            });
        }

        default:
            return state;
    }
}
