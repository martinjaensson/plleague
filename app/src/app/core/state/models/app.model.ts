import { SessionState, ErrorState, OrdersState, OrdersFilterState, OrderState, ComboboxItemsState } from './';

export interface AppState {
    
    session: SessionState;

    error: ErrorState;

    orders: OrdersState;
    
    ordersFilter: OrdersFilterState;
    
    order: OrderState;

    comboboxItems: ComboboxItemsState;
}