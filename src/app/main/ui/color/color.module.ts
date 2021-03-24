import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { ColorComponent } from 'app/main/ui/color/color.component';
import { AuthGuard } from 'app/main/pages/authentication/login/auth.guard';

const routes: Routes = [
    {
        path     : 'color',
        component: ColorComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ColorComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UIColorModule
{
}
