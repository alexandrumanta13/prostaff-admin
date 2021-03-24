import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { orderStatuses } from 'app/main/apps/e-commerce/order/order-statuses';
import { Order } from 'app/main/apps/e-commerce/order/order.model';
import { EcommerceOrderService } from 'app/main/apps/e-commerce/order/order.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'e-commerce-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EcommerceOrderComponent implements OnInit, OnDestroy {
    order: Order;
    orderStatuses: any;
    statusForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    private _httpClient: HttpClient;

    /**
     * Constructor
     *
     * @param {EcommerceOrderService} _ecommerceOrderService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _ecommerceOrderService: EcommerceOrderService,
        private _formBuilder: FormBuilder,
        private httpClient: HttpClient
    ) {
        // Set the defaults
        this.order = new Order();
        this.orderStatuses = orderStatuses;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._httpClient = httpClient;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update order on changes
        this._ecommerceOrderService.onOrderChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.order = new Order(order);
            });

        this.statusForm = this._formBuilder.group({
            newStatus: ['']
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update status
     */
    updateStatus(): void {

        const newStatusName = this.statusForm.get('newStatus').value;
        console.log(newStatusName)
        if (!newStatusName) {
            return;
        }

        const newStatus = this.orderStatuses.find((status) => {
            return status.name === newStatusName;
        });



        
        newStatus['order_guid'] = this.order.reference;
        const sendStatus = { 
            order_uid: this.order.reference,
            status: [{
                name: newStatus.name,
                color: newStatus.color
            }]
        }
        console.log(JSON.stringify(sendStatus))


        this._httpClient.put(`https://pro-staff.ro/prostaff-api/v1/order/edit/status`, JSON.stringify(sendStatus))
            .subscribe((data: any) => {
                console.log(data)
            })
        this.order.status.unshift(newStatus);
    }
}
