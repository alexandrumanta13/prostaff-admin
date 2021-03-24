import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ColorService implements Resolve<any>
{
    colors: [];
    palettes: [];
   

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
       
       
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getColors()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

     /**
     * Get palettes
     *
     * @returns {Promise<any>}
     */
    getPalettes() : Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palettes')
                .subscribe((response: any) => {
                    console.log(response)
                    this.palettes = response;
                    resolve(response);
                }, reject);
        });
       
    }

    /**
     * Get colors
     *
     * @returns {Promise<any>}
     */
    getColors() : Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palettes')
                .subscribe((response: any) => {
                    console.log(response)
                    this.colors = response;
                    resolve(response);
                }, reject);
        });
       
    }
}
