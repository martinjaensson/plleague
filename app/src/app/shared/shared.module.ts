import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk';

import { COMPONENTS } from './components';
import { PIPES } from './pipes';

import { 
    MaterialModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdTabsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdRippleModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule
} from '@angular/material';

export const SHARED_MATERIAL_COMPONENTS = [ 
    MaterialModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdTabsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdRippleModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule
];

// export const SHARED_MATERIAL_COMPONENTS_ROOT: any[] = [];
// for (let i = 0; i < SHARED_MATERIAL_COMPONENTS.length; i ++)
//     SHARED_MATERIAL_COMPONENTS_ROOT.push(SHARED_MATERIAL_COMPONENTS[i].forRoot());

/**
 * Contains all shared stuff for the application. This module
 * should be imported in all other app modules.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,


        ...SHARED_MATERIAL_COMPONENTS
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        ...SHARED_MATERIAL_COMPONENTS,

        ...COMPONENTS,
        ...PIPES
    ],
    declarations: [
        ...COMPONENTS,
        ...PIPES,
    ]
})
export class SharedModule {

}
