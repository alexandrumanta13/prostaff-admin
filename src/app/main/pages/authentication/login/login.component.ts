import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthResponseData, AuthService } from './auth-api.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    private userSub: Subscription;
    isAuthentificated: boolean;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        public router: Router,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthentificated = !!user;
            console.log(user)
            if (this.isAuthentificated && user.access == 99) {
                this.router.navigate(['/apps/e-commerce/orders']);
            }
        })
    }

    submit() {
        let authObs: Observable<AuthResponseData>;

        authObs = this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

        authObs.subscribe(data => {
            console.log(data)
            this.router.navigate(['/apps/e-commerce/orders']);

        }, error => {
            console.log(error)
        });

    }
}
