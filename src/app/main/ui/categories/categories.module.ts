import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { MatInputModule } from '@angular/material/input';
import { CategoriesComponent } from './categories.component';
import { AuthGuard } from 'app/main/pages/authentication/login/auth.guard';

const routes: Routes = [
    {
        path     : 'categories',
        component: CategoriesComponent, canActivate: [AuthGuard]
    },
    {
        path     : 'categories/:handle',
        component: CategoriesComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        CategoriesComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,

        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UICategoriesModule
{
}
