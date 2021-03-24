import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, take, takeUntil } from 'rxjs/operators';
import { Inject } from '@angular/core';


@Component({
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
    pageType: string;

    categories: [];
    selectedCategory: string;
    category_id: any;
    onCategoryChanged: BehaviorSubject<any>;
    items$: any;
    addNewCategory: boolean = false;
    category: any;
    banner: string;



    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router,
        private _location: Location,
        @Inject(DOCUMENT) private document: Document

    ) {
        // Set the defaults
        this.onCategoryChanged = new BehaviorSubject({});
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/categories')
            .subscribe((response: any) => {
                console.log(response.data)
                this.categories = response.data;
            });

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        if (this.router.url.includes('new')) {
            this.pageType = 'new';
        }

    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Select category
     *
     * @param selected
     */
    selectCategory(selected): void {
        this.category_id = selected.tab.textLabel
        this._updateSelectedCategory(selected.tab.textLabel);
    }

    getCategory(slug) {
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/category/' + slug)
            .subscribe((response: any) => {
 
                this.onCategoryChanged.next(response.data);
                this.items$ = this.onCategoryChanged.asObservable();
                this.items$.subscribe(data => {
                    this.category = data;
                    console.log(this.category)
                  })
               
            });
    }

    /**
     * Update selected category
     *
     * @param category
     * @private
     */
    private _updateSelectedCategory(slug): void {
        console.log(slug)
        this.selectedCategory = slug;
        this.getCategory(this.selectedCategory);
    }



    categoryBanner(event, slug) {
        let fileList: FileList = event.target.files;
        console.log(event.target.files)
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this.uploadImage(formData, options)
                .then(image => {
                    console.log(image)
                    this.banner = 'https://pro-staff.ro/upload/categories/' + image.file;
                    this.addNewCategory = true;

                    this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/category/' + slug + '/update', { 'banner': this.banner, 'slug': slug })
                    .subscribe((response: any) => {
                        console.log(response)
                        this.getCategory(slug)
                    });

                })

        }

    }

    categoryFeatured(event, slug) {
        let fileList: FileList = event.target.files;
        console.log(event.target.files)
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this.uploadImage(formData, options)
                .then(image => {
                    console.log(image)
                    this.banner = 'https://pro-staff.ro/upload/categories/' + image.file;
                    this.addNewCategory = true;

                    this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/category/' + slug + '/featured', { 'banner': this.banner, 'slug': slug })
                    .subscribe((response: any) => {
                        console.log(response)
                        this.getCategory(slug)
                    });

                })

        }

    }

    deleteBanner(banner, slug): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this._httpClient.post('https://pro-staff.ro/upload/remove-sliders.php', { 'banner': banner }, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                    this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/category/' + slug + '/update', { 'banner': '', 'slug': slug })
                    .subscribe((response: any) => {
                        console.log(response)
                        this.getCategory(slug)
                    });
                }, reject);
        });

    }

    deleteFeatured(banner, slug): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this._httpClient.post('https://pro-staff.ro/upload/remove-sliders.php', { 'banner': banner }, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                    this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/category/' + slug + '/featured', { 'banner': '', 'slug': slug })
                    .subscribe((response: any) => {
                        console.log(response)
                        this.getCategory(slug)
                    });
                }, reject);
        });

    }



    uploadImage(formData, options): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/upload/upload-categories.php', formData, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }


}
