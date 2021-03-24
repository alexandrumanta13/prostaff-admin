import { Component, OnInit } from '@angular/core';

import { MatColors } from '@fuse/mat-colors';
import { ColorService } from './color.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'color',
    templateUrl: './color.component.html',
    styleUrls: ['./color.component.scss']
})
export class ColorComponent {
    colors: [];
    palettes: [];
    selectedColor: string;
    selectedColorDefaultValue: string;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        // this.colors = this._colorsService.getPalettes();

        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palettes')
            .subscribe((response: any) => {
                console.log(response)
                this.palettes = response;
                console.log(this.palettes);
                //this.onProductsChanged.next(this.products);
                //resolve(response);
            });

        this.getColors(1);
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
        this._updateSelectedColor(selected.tab.textLabel);
    }

    getColors(id) {
        this._httpClient.get('https://pro-staff.ro/prostaff-api/v1/palette/' + id + '/colors')
            .subscribe((response: any) => {
                console.log(response)
                this.colors = response;

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
       // this.selectedColorDefaultValue = MatColors.getColor(this.selectedColor)[500];
    }
}
