import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { OrdersComponent } from './orders.component';
import { OrdersRoutes } from './orders.routes';

@NgModule({
    imports: [ 
        SharedModule,

        OrdersRoutes
    ],
    exports: [],
    declarations: [ 
        OrdersComponent
    ],
    providers: [],
})
export class OrdersModule { }
