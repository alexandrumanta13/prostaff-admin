import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { MatInputModule } from '@angular/material/input';
import { SlidersComponent } from './sliders.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from 'app/main/pages/authentication/login/auth.guard';

const routes: Routes = [
    {
        path     : 'sliders',
        component: SlidersComponent, canActivate: [AuthGuard]
    },
    {
        path     : 'sliders/:handle',
        component: SlidersComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        SlidersComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,

        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UISlidersModule
{
}
