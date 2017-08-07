import { SessionService } from './session.service';
import { ErrorService } from './error.service';
import { OrderService } from './order.service';
import { ComboboxItemsService } from './comboboxitems.service';

export { SessionService } from './session.service';
export { ErrorService } from './error.service';
export { OrderService } from './order.service';
export { ComboboxItemsService } from './comboboxitems.service';


export const SERVICES = [
    SessionService,
    ErrorService,
    OrderService,
    ComboboxItemsService
];