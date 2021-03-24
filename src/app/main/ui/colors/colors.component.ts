import { Component, OnInit } from '@angular/core';

import { MatColors } from '@fuse/mat-colors';
import { ColorsService } from './colors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, take, takeUntil } from 'rxjs/operators';


@Component({
    selector: 'colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss']
})
export class ColorsComponent {
    pageType: string;
    colors: [];
    palettes: [];
    selectedColor: string;
    selectedColorDefaultValue: string;
    palette_name: any;
    palette_id: any;
    addNewColor: boolean = false;

    onColorsChanged: BehaviorSubject<any>;

    // Private
    private _unsubscribeAll: Subject<any>;
    color_name: any;
    color_image: any;
    items$: any;
    hasBaseColor: boolean = false;
    BaseColorID: boolean;
    new: boolean;

   

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router,

    ) {
        // Set the defaults
        this.onColorsChanged = new BehaviorSubject({});
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palettes')
            .subscribe((response: any) => {
                this.palettes = response;
            });

        this.getColors(1);

        // Set the private defaults
        this._unsubscribeAll = new Subject();

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
     * Select color
     *
     * @param selected
     */
    selectColor(selected): void {
        this.palette_id = selected.tab.textLabel
        this._updateSelectedColor(selected.tab.textLabel);
    }

    getColors(id) {
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palette/' + id + '/colors')
            .subscribe((response: any) => {
                console.log(response)

                this.colors = response;
                this.onColorsChanged.next(this.colors);
                this.items$ = this.onColorsChanged.asObservable();
                if(this.colors.length == 0) {
                    this.new = true;
                }
                this.colors.map(baseColor => {
                    if(baseColor == 0) {
                       this.BaseColorID = false;
                    }
                })
                const images = document.querySelectorAll('.bg');
                const imagesArr = Array.from(images)
                imagesArr.map(image => {
                    
                    (<HTMLElement>image).style.background = "url('"+ image.getAttribute('data-image') + "') repeat right top";
                })
            });
    }

    /**
     * Update selected color
     *
     * @param colorName
     * @private
     */
    private _updateSelectedColor(id): void {
        console.log(id)
        this.selectedColor = id;
        this.getColors(this.selectedColor);
    }

    addPalette() {

        this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/palette/add', { 'palette_name': this.palette_name })
            .subscribe((response: any) => {
                console.log(response)
                // Change the location with new on
                this.router.navigate(['ui/colors/']);
            });

    }

    fileChange(event, indexInfo) {
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
                    this.color_image = 'https://pro-staff.ro/upload/colors/' + image.file;
                    
                })

        }

    }

    uploadImage(formData, options): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.post('https://pro-staff.ro/upload/upload-color.php', formData, options)
                .pipe(map(res => res))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }

    addColor() {
        this._httpClient.post('https://pro-staff.ro/prostaff-api/v1/palette/'+ this.selectedColor +'/color/add', { 'id': this.selectedColor, 'color': this.color_name, 'color_image': this.color_image })
            .subscribe((response: any) => {
                this.addNewColor = false;
                // Change the location with new on
                this.getColors(this.selectedColor)
            });
    }

    addNewColorFn() {
        this.addNewColor = true;
    }
}
