import { RouterModule, PreloadAllModules } from '@angular/router';

import { OrdersComponent } from './orders.component';

export const OrdersRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: OrdersComponent
        }
    ]
);