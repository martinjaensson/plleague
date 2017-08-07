import { Order } from '../../models';

export interface OrdersState {
    loading: boolean;
    list: Order[];
    page: number;
}

