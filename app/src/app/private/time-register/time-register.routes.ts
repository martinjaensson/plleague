import { RouterModule, PreloadAllModules } from '@angular/router';

import { TimeRegisterComponent } from './time-register.component';

export const TimeRegisterRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: TimeRegisterComponent
        }
    ]
);