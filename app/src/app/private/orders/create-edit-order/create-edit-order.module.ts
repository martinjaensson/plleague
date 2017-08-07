import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared';

import { CreateEditOrderComponent } from './create-edit-order.component';
import { CreateEditOrderRoutes } from './create-edit-order.routes';

import { COMPONENTS } from './components/index';
import { PIPES } from './pipes/index';
import { ENTRY_COMPONENTS } from './components/index';

@NgModule({
    imports: [ 
        SharedModule,

        CreateEditOrderRoutes,
        
    ],
    entryComponents: [
        ...ENTRY_COMPONENTS,
    ],
    exports: [
        ...PIPES
    ],
    declarations: [ 
        CreateEditOrderComponent,
        ...COMPONENTS,
        ...PIPES
    ],
    providers: [],
})
export class CreateEditOrderModule { }
