import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatListModule } from '@angular/material/list';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { EcommerceProductsComponent } from 'app/main/apps/e-commerce/products/products.component';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';
import { EcommerceProductComponent } from 'app/main/apps/e-commerce/product/product.component';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { EcommerceOrdersComponent } from 'app/main/apps/e-commerce/orders/orders.component';
import { EcommerceOrdersService } from 'app/main/apps/e-commerce/orders/orders.service';
import { EcommerceOrderComponent } from 'app/main/apps/e-commerce/order/order.component';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';


import { DragDirective } from 'app/main/apps/e-commerce/product/product.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AuthGuard } from 'app/main/pages/authentication/login/auth.guard';


const routes: Routes = [
    {
        path     : 'products',
        component: EcommerceProductsComponent, canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:id',
        component: EcommerceProductComponent, canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'products/:id/:handle',
        component: EcommerceProductComponent, canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'orders',
        component: EcommerceOrdersComponent, canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceOrdersService
        }
    },
    {
        path     : 'orders/:id',
        component: EcommerceOrderComponent, canActivate: [AuthGuard],
        resolve  : {
            data: EcommerceOrderService
        }
    }

    
];

@NgModule({
    declarations: [
        EcommerceProductsComponent,
        EcommerceProductComponent,
        EcommerceOrdersComponent,
        EcommerceOrderComponent,
        DragDirective,
        
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        
        
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,

        NgxMatSelectSearchModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDjdLxZsC1eR4RzY3grkbGnDckk7DcCmBU'
        }),

        FuseSharedModule,
        FuseWidgetModule,
        
    ],
    providers   : [
        EcommerceProductsService,
        EcommerceProductService,
        EcommerceOrdersService,
        EcommerceOrderService,
        NgxDropzoneModule
        
    ]
})
export class EcommerceModule
{
}
