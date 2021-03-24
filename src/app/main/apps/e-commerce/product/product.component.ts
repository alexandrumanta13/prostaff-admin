import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { HttpHeaders } from '@angular/common/http';

import { FileHandle } from './product.directive';
import { Router } from '@angular/router';




@Component({
    selector: 'e-commerce-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],

    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy {
    product: Product;
    pageType: string;
    productForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    categories: any = [];

    currentCategory: any;
    subcategories: any = [];

    featured: boolean = false;
    categoryFeatured: boolean = false;
    isActive: boolean = true;


    public informationValues = [{
        quantity: '',
        um: '',
        // palette: '',
        // colors: [],
        // datasheet: '',
        old_price: 0,
        price: 0
    }];

    files: FileHandle[] = [];
    productUploadImages: any = [];

    public colorValues: any = [];
    palettes: any;
    colors: any = [];
    old_price: any;
    price: any;
    images: any = [];
    categoryId: any;
    category: any;
    subcategoryId: any;
    currentSubcategory: any;
    datasheet: string = '';
    products: string[] = [];
    selectedProducts: any;
    public selected = [];
    public groups;
    public complementary_products: string[] = [];
    dataArray: any[];
    editCategory: any;
    editSubcategory: any;
    complementary: any;


    public filteredBanksMulti: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);
    public bankMultiFilterCtrl: FormControl = new FormControl();
    additional_images: any;
    
    palette: any;
    disabled: boolean;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _router: Router,
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.product = new Product();

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
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {
                console.log(product)
                if (product) {
                    
                    this.product = new Product(product);
                    this.currentCategory = (product.categories.length > 0 ? product.categories[0].id : '');
                    
                    this.categoryId = (product.categories.length > 0 ? product.categories[0].id : '');
                    this.subcategoryId = (product.subcategories.length > 0 ? product.subcategories[0].id : '');
                    this.currentSubcategory = (product.subcategories.length > 0 ? product.subcategories[0].id : '');
                    this.additional_images = product.images;
                    this.isActive = (product.isActive === '1' ? true : false);
                    this.palette = product.PaletteColorID;
                    this.datasheet = product.datasheet;
                    this.featured = (product.featured === '1' ? true : false);
                    this.categoryFeatured = (product.categoryFeatured === '1' ? true : false);
                    this.informationValues = product.information;
                    this._ecommerceProductService.getSubcategories(this.currentCategory)
                        .then(subcategories => {
                            this.subcategories = subcategories.data
                        })
                    this.getComplementary();
                    this.pageType = 'edit';
                    
                }
                else {
                    this.pageType = 'new';
                    this.product = new Product();
                    this.isActive = true;
                    this.featured = false;
                    this.categoryFeatured = false;
                }

                this.productForm = this.createProductForm();
                
            });
        this._ecommerceProductService.getCategories()
            .then(categories => {
                this.categories = categories.data
            })
        this._ecommerceProductService.getPalettes()
            .then(palettes => {
                this.palettes = palettes
            });

        this._ecommerceProductService.getProducts()
            .then(products => {
                console.log(products.slice())
                this.selectedProducts = products;
                this.filteredBanksMulti.next(products.slice());
                this.groups = this.selectedProducts.slice();
                products.map((product, index) => {

                    this.products = [...this.products, product];

                })

            });


        this.bankMultiFilterCtrl.valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.filterBanksMulti();
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
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            alias: [this.product.alias],
            product_name: [this.product.product_name],
            // handle: [this.product.handle],
            description: [this.product.description],
            categories: [this.product.categories],
            subcategories: [this.product.subcategories],
            // tags: [this.product.tags],
            image_url: [this.product.image_url],
            additional_images: [this.product.additional_images],
            // priceTaxExcl: [this.product.priceTaxExcl],
            // priceTaxIncl: [this.product.priceTaxIncl],
            // taxRate: [this.product.taxRate],
            // comparedPrice: [this.product.comparedPrice],
            // quantity: [this.product.quantity],
            sku: [this.product.sku],
            brand: [this.product.brand],
            palette: [this.product.palette],

            datasheet: [this.product.datasheet],
            // width: [this.product.width],
            // height: [this.product.height],
            // depth: [this.product.depth],
            // weight: [this.product.weight],
            // extraShippingFee: [this.product.extraShippingFee],
            isActive: [this.product.isActive],
            featured: [this.product.featured],
            categoryFeatured: [this.product.categoryFeatured],
            information: [this.product.information],
            complementary_products: [this.product.complementary_products],
        });
    }


    private filterBanksMulti() {
        if (!this.selectedProducts) {
            return;
        }
        // get the search keyword
        let search = this.bankMultiFilterCtrl.value;
        if (!search) {
            this.filteredBanksMulti.next(this.selectedProducts.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.filteredBanksMulti.next(
            this.selectedProducts.filter(bank => bank.product_name.toLowerCase().indexOf(search) > -1)
        );
    }

    getSubcategories(event) {

        this.categoryId = (this.pageType == 'edit' ? this.categoryId : this.currentCategory.id);

        this._ecommerceProductService.getSubcategories(this.pageType == 'edit' ? event.value : this.currentCategory.id)
            .then(subcategories => {
                if (event.value) {
                    this.categoryId = event.value;
                }
                this.subcategories = subcategories.data
            })
    }

    getSubcategoryId(event) {
        this.subcategoryId = (this.pageType == 'edit' ? event.value : this.currentSubcategory.id);
    }

    getComplementary() {
        this._ecommerceProductService.getComplementary(this.product.id)
            .then(complementary => {
                this.complementary = complementary.data
            })
    }

    deleteComplementary(id) {
        this._ecommerceProductService.deleteComplementary(id)

            .then(complementary => {
                this.getComplementary()
            })
    }


    // getColors(event, indexInfo) {
    //     this._ecommerceProductService.getColors(event.value)
    //         .then(colors => {
    //             colors.map((color, i) => {
    //                 this.colors.push({ name: color.color, old_price: 0, price: 0 })
    //             })
    //             this.informationValues[indexInfo].colors = [...this.colors]
    //             this.colors = [];

    //         })
    // }

    addQuantity() {
        const arr = {
            quantity: '',
            um: '',
            // palette: '',
            // colors: [],
            // datasheet: '',
            old_price: 0,
            price: 0
        }
        this.informationValues = [...this.informationValues, arr];
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        this.disabled = true;

        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            //this.informationValues[indexInfo].datasheet = 'https://pro-staff.ro/upload/datasheets/' + file.name;
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Accept', 'application/json');
            let options = { headers: headers };

            this._ecommerceProductService.uploadDatasheet(formData, options)
                .then(datasheet => {
                    this.datasheet = 'https://pro-staff.ro/upload/datasheets/' + datasheet.file;
                    this.disabled = false;
                })

        }

    }

    filesDropped(files): void {
        this.disabled = true;
        this.files = files;
        this.files.map((file, i) => {
            // this.productUploadImages.push(file.name)
        });

        const formData = new FormData();

        for (var i = 0; i < this.files.length; i++) {
            formData.append("uploadFile[]", this.files[i].file);
        }



        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = { headers: headers };

        this._ecommerceProductService.uploadImages(formData, options)
            .then(response => {
                response.data.map((file, i) => {
                    this.productUploadImages.push('https://pro-staff.ro/upload/' + file);
                    this.disabled = false;
                });
            })
    }

    /**
     * Save product
     */
    saveProduct(): void {
        const data = this.productForm.getRawValue();
        // data.handle = FuseUtils.handleize(data.name);
        data.id = this.product.id;
        data.information = [...this.informationValues];
        data.categories = [];
        data.subcategories = [];
        data.categories.push(parseInt(this.categoryId));
        data.subcategories.push(parseInt(this.subcategoryId));
        data.datasheet = this.datasheet;
        data.additional_images = [...this.productUploadImages];
        //data.image_url = (data.additional_images.length > 0 ? data.additional_images[0] : this.product.image_url);
        data.isActive = this.isActive;
        data.featured = this.featured;
        data.PaletteColorID = this.palette;
        data.categoryFeatured = this.categoryFeatured;
        

        console.log(data)

        this._ecommerceProductService.saveProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                // this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                this.getComplementary();

                // this._location.go('/apps/e-commerce/products/'+ this.product.alias);
                this._router.navigate(['/apps/e-commerce/products/'+ this.product.alias]);
            });

    }

    /**
     * Add product
     */
    addProduct(): void {
        const data = this.productForm.getRawValue();
        data.information = [...this.informationValues];
        data.categories = [];
        data.subcategories = [];
        data.categories.push(parseInt(this.categoryId));
        data.subcategories.push(parseInt(this.subcategoryId));
        data.datasheet = this.datasheet;
        data.additional_images = [...this.productUploadImages];
        data.image_url = data.additional_images[0];
        data.isActive = this.isActive;
        data.featured = this.featured;
        data.categoryFeatured = this.categoryFeatured;



        this._ecommerceProductService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this._router.navigate(['/apps/e-commerce/products/']);
            });

    }

    // changeOldPrice($event, field, index, i) {

    //     if (this.informationValues[index].colors[i].name == field.name) {
    //         this.informationValues[index].colors[i].old_price = $event
    //     }

    // }
    // changePrice($event, field, index, i) {
    //     if (this.informationValues[index].colors[i].name == field.name) {
    //         this.informationValues[index].colors[i].price = $event
    //     }

    // }

    deleteImage(id) {
        console.log(id)
        this._ecommerceProductService.deleteImage(id).then(data => {
            if(data.success) {
                this._ecommerceProductService.getProduct().then(product => {
                    this._ecommerceProductService.onProductChanged.next(product);
                })
                
               
                this._matSnackBar.open('Image deleted', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                this._router.navigate(['/apps/e-commerce/products/'+ this.product.alias]);
            } else {
                this._matSnackBar.open('Image not deleted!', 'Something went wrong', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        })
    }

    deleteQnt(info, productID) {
        console.log(info, productID)
        this._ecommerceProductService.deleteQnt(info.id, productID).then(data => {
            if(data.success) {
                this._ecommerceProductService.getProduct().then(product => {
                    this._ecommerceProductService.onProductChanged.next(product);
                })
                
               
                this._matSnackBar.open('Qunatity deleted', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Quantity not deleted!', 'Something went wrong', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        })
    }
}
