import { reducer as sessionReducer } from './session.reducer';
import { reducer as errorReducer } from './error.reducer';
import { reducer as ordersReducer } from './orders.reducer';
import { reducer as ordersFilterReducer } from './orders-filter.reducer';
import { reducer as orderReducer } from './order.reducer';
import { reducer as comboboxItemsReducer } from './comboboxitems.reducer';

export const REDUCERS = {
    session: sessionReducer,

    error: errorReducer,

    orders: ordersReducer,

    ordersFilter: ordersFilterReducer,

    order: orderReducer,

    comboboxItems: comboboxItemsReducer
};