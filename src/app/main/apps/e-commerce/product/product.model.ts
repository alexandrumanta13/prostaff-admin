import { MatChipInputEvent } from '@angular/material/chips';

import { FuseUtils } from '@fuse/utils';

export class Product {
    id: number;
    alias: string;
    product_name: string;
    description: string;
    categories: [];
    subcategories: [];
    additional_images: {
        image_url: string;
    }[];
    complementary_products: [];
    image_url: string;
    sku: string;
    brand: string;
    palette: number;
    datasheet: string;
    isActive: boolean;
    featured: boolean;
    categoryFeatured: boolean;
    information: {
        quantity: string,
        um: string,
        // palette: string,
        // colors: [{
        //     name: string,
        //     old_price: number,
        //     price: number
        // }],
        // datasheet: string,
        old_price: number,
        price: number
    }[];
    
    // tags: string[];
    // handle: string;
    // priceTaxExcl: number;
    // priceTaxIncl: number;
    // taxRate: number;
    // comparedPrice: number;
    // quantity: number;
    // width: string;
    // height: string;
    // depth: string;
    // weight: string;
    // extraShippingFee: number;

    /**
     * Constructor
     *
     * @param product
     */
    constructor(product?) {
        product = product || {};
        this.alias = product.alias;
        this.id = parseInt(product.id) //|| FuseUtils.generateGUID();
        this.product_name = product.product_name || '';
        // this.handle = product.handle || FuseUtils.handleize(this.product_name);
        this.description = product.description || '';
        this.categories = product.categories || [];
        // this.tags = product.tags || [];
        this.image_url = product.image_url || '';
        this.additional_images = product.additional_images || [];
        // this.priceTaxExcl = product.priceTaxExcl || 0;
        // this.priceTaxIncl = product.priceTaxIncl || 0;
        // this.taxRate = product.taxRate || 0;
        // this.comparedPrice = product.comparedPrice || 0;
        // this.quantity = product.quantity || 0;
        this.sku = product.sku || 0;
        this.brand = product.brand || '';
        this.palette = product.palette || 0;
        this.datasheet = product.datasheet || '';
        // this.width = product.width || 0;
        // this.height = product.height || 0;
        // this.depth = product.depth || 0;
        // this.weight = product.weight || 0;
        // this.extraShippingFee = product.extraShippingFee || 0;
        this.isActive = product.isActive;
        this.featured = product.featured;
        this.categoryFeatured = product.categoryFeatured;
        this.information = product.information || [];
    }

    /**
     * Add category
     *
     * @param {MatChipInputEvent} event
     */
    // addCategory(event: MatChipInputEvent): void {
    //     const input = event.input;
    //     const value = event.value;

    //     // Add category
    //     if (value) {
    //         this.categories.push(value);
    //     }

    //     // Reset the input value
    //     if (input) {
    //         input.value = '';
    //     }
    // }

    /**
     * Remove category
     *
     * @param category
     */
    // removeCategory(category): void {
    //     const index = this.categories.indexOf(category);

    //     if (index >= 0) {
    //         this.categories.splice(index, 1);
    //     }
    // }

    /**
     * Add tag
     *
     * @param {MatChipInputEvent} event
     */
    // addTag(event: MatChipInputEvent): void {
    //     const input = event.input;
    //     const value = event.value;

    //     // Add tag
    //     if (value) {
    //         this.tags.push(value);
    //     }

    //     // Reset the input value
    //     if (input) {
    //         input.value = '';
    //     }
    // }

    /**
     * Remove tag
     *
     * @param tag
     */
    // removeTag(tag): void {
    //     const index = this.tags.indexOf(tag);

    //     if (index >= 0) {
    //         this.tags.splice(index, 1);
    //     }
    // }
}
