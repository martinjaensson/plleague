import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { CertifyComponent } from './certify.component';
import { CertifyRoutes } from './certify.routes';

@NgModule({
    imports: [ 
        SharedModule,

        CertifyRoutes
    ],
    exports: [],
    declarations: [ 
        CertifyComponent
    ],
    providers: [],
})
export class CertifyModule { }
