import { RouterModule, PreloadAllModules } from '@angular/router';

import { CreateEditOrderComponent } from './create-edit-order.component';

export const CreateEditOrderRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: CreateEditOrderComponent
        }
    ]
);
