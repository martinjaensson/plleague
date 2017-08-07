import { RouterModule, PreloadAllModules } from '@angular/router';

import { AuthenticationGuard } from '../core/guards';

import { PrivateComponent } from './private.component'; 

export const PrivateRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: PrivateComponent,
            canActivate: [
                AuthenticationGuard
            ],
            children: [
                {
                    path: '',
                    loadChildren: './overview/overview.module#OverviewModule'
                },
                 {
                    path: 'attestering',
                    loadChildren: './certify/certify.module#CertifyModule'
                },
                 {
                    path: 'delprojektoversikt',
                    loadChildren: './orders/orders.module#OrdersModule'
                },
                 {
                    path: 'tidsregistering',
                    loadChildren: './time-register/time-register.module#TimeRegisterModule'
                },
                 {
                    path: 'skaparedigeraprojekt/:id',
                    loadChildren: './orders/create-edit-order/create-edit-order.module#CreateEditOrderModule'
                }
            ]
        }
    ]
);
