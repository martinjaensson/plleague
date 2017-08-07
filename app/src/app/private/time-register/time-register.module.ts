import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { TimeRegisterComponent } from './time-register.component';
import { TimeRegisterRoutes } from './time-register.routes';

@NgModule({
    imports: [ 
        SharedModule,

        TimeRegisterRoutes
    ],
    exports: [],
    declarations: [ 
        TimeRegisterComponent
    ],
    providers: [],
})
export class TimeRegisterModule { }