import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule } from '@fuse/components/demo/demo.module';

import { ColorsComponent } from 'app/main/ui/colors/colors.component';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthGuard } from 'app/main/pages/authentication/login/auth.guard';

const routes: Routes = [
    {
        path     : 'colors',
        component: ColorsComponent, canActivate: [AuthGuard]
    },
    {
        path     : 'colors/:handle',
        component: ColorsComponent, canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        ColorsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatCheckboxModule,
        FuseSharedModule,
        FuseDemoModule
    ]
})
export class UIColorsModule
{
}
