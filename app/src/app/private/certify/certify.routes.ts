import { RouterModule, PreloadAllModules } from '@angular/router';

import { CertifyComponent } from './certify.component';

export const CertifyRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: CertifyComponent
        }
    ]
);
