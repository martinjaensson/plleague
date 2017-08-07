import { Order } from '../../models';

export interface OrderState {
    loading: boolean;
    item: Order;
}
