import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, take, takeUntil } from 'rxjs/operators';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'sliders',
    templateUrl: './sliders.component.html',
    styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent {
    pageType: string;
    slider: [];
    sliders: [];
    selectedSlider: string;
    slider_name: any;
    slider_id: any;

    onSlidersChanged: BehaviorSubject<any>;

    color_name: any;
    color_image: any;
    items$: any;
    addNewSlider: boolean = false;
    background: string;
    product_image: string;
    thumb: string;
    productLink: string;
    h1: any;
    h3: any;



    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router,
        private _location: Location,
        @Inject(DOCUMENT) private document: Document,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the defaults
        this.onSlidersChanged = new BehaviorSubject({});
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/sliders')
            .subscribe((response: any) => {
                this.sliders = response;
            });

        //this.getSliders(1);

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
     * Select slider
     *
     * @param selected
     */
    selectSlider(selected): void {
        this.slider_id = selected.tab.textLabel
        this._updateSelectedSlider(selected.tab.textLabel);
    }

    getSliders(id) {
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/sliders/' + id + '/slider')
            .subscribe((response: any) => {
                console.log(response)
                this.slider = response;
                this.onSlidersChanged.next(this.slider);
                this.items$ = this.onSlidersChanged.asObservable();
            });
    }

    /**
     * Update selected color
     *
     * @param slider
     * @private
     */
    private _updateSelectedSlider(id): void {
        console.log(id)
        this.selectedSlider = id;
        this.getSliders(this.selectedSlider);
    }

    addSliders() {

        this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/sliders/add', { 'slider_name': this.slider_name })
            .subscribe((response: any) => {
                console.log(response)
                // Change the location with new on
                this.router.navigate(['/admin/ui/sliders/']);
            });

    }

    sliderBg(event) {
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
                    this.background = 'https://pro-staff.ro/upload/sliders/' + image.file;
                    if (this.product_image) {
                        this.addNewSlider = true;
                    }
                })

        }

    }

    removeImage(background, product): Promise<any> {



        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this._httpClient.post('https://pro-staff.ro/upload/remove-sliders.php', { 'background': background, 'product': product }, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }


    sliderProductImage(event) {
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
                    this.product_image = 'https://pro-staff.ro/upload/sliders/' + image.file;
                    if (this.background) {
                        this.addNewSlider = true;
                    }
                })

        }

    }

    productImage(event) {
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
                    this.thumb = 'https://pro-staff.ro/upload/sliders/' + image.file;
                    if (this.thumb) {
                        this.addNewSlider = true;
                    }
                })

        }

    }

    uploadImage(formData, options): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/upload/upload-sliders.php', formData, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    addSlider() {

        this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/sliders/' + this.selectedSlider + '/slider/add', 
        { 
            'SliderID': this.selectedSlider, 
            'product': this.product_image, 
            'background': this.background, 
            'thumb': this.thumb,
            'productLink': this.productLink,
            'h1': this.h1,
            'h3': this.h3
        })
            .subscribe((response: any) => {
                this.addNewSlider = false;
                // Change the location with new on
               
                // Show the success message
                this._matSnackBar.open('Slider added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
               // this.document.location.href = '/ui/sliders';
            });


    }

    deleteSlider(background, product) {

        this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/sliders/delete', { 'SliderID': this.selectedSlider })
            .subscribe((response: any) => {
                this.addNewSlider = false;
                // Change the location with new on
                this.product_image = '';
                this.background = '';
                this.removeImage(background, product);

                // Show the success message
                this._matSnackBar.open('Slider deleted', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
                this.document.location.href = '/ui/sliders';
            });


    }


}
