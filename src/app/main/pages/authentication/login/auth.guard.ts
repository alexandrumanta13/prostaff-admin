
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


import { AuthService } from './auth-api.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }


    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean  | UrlTree  | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
       
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth && user.access == 99) {
                  return true;
                }
                return this.router.createUrlTree(['/pages/auth/login']);
        })
    )
    }

}
