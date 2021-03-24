import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    routeParams: any;
    product: any;
    categories: any;
    onProductChanged: BehaviorSubject<any>;
    subcategories: any;
    palettes: any;
    products: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else {
                this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/product/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/categories')
                .subscribe((response: any) => {

                    this.categories = response;

                    resolve(response);
                }, reject);

        });
    }

    getSubcategory(slug): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/subcategory/' + slug)
                .subscribe((response: any) => {
                    console.log(response)


                    resolve(response);
                }, reject);

        });
    }

    /**
     * Get complementary products
     *
     * @returns {Promise<any>}
     */

    getComplementary(id): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/complementary/' + id)
                .subscribe((response: any) => {
                    console.log(response)
                    resolve(response);
                }, reject);

        });
    }

    deleteComplementary(id): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/complementary/delete', {'id': id})
                .subscribe((response: any) => {
                    console.log(response)
                    resolve(response);
                }, reject);

        });
    }

    deleteQnt(QuantityID, ProductID): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/quantity/delete', {'QuantityID': QuantityID, 'ProductID': ProductID})
                .subscribe((response: any) => {
                    console.log(response)
                    resolve(response);
                }, reject);

        });
    }


    /**
     * Get subcategories
     *
     * @returns {Promise<any>}
     */
    getSubcategories(id): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/category/' + id + '/subcategoriesID')
                .subscribe((response: any) => {
                    console.log(response)
                    this.subcategories = response;

                    resolve(response);
                }, reject);

        });
    }


    /**
     * Get palettes
     *
     * @returns {Promise<any>}
     */
    getPalettes(): Promise<any> {
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
    getColors(id: any): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palette/' + id + '/colors')
                .subscribe((response: any) => {
                    console.log(response)
                    this.palettes = response;
                    resolve(response);
                }, reject);

        });
    }

    uploadDatasheet(formData, options): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/upload/upload-datasheet.php', formData, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }


    uploadImages(formData, options): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/upload/upload-images.php', formData, options)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }


    getImages(slug): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/product-images/' + slug)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    deleteImage(id): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/delete-product-image', {id: id})
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/product/update', product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/product', product)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/productsAll')
                .subscribe((response: any) => {
                    this.products = response;
                    resolve(response);
                }, reject);
        });

    }
}
