import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            
            
            
            {
                id        : 'products',
                title     : 'Products',
                type      : 'item',
                icon      : 'format_paint',
                url       : '/apps/e-commerce/products',
                exactMatch: true
            },
            
            {
                id        : 'orders',
                title     : 'Orders',
                type      : 'item',
                icon      : 'shopping_cart',
                url       : '/apps/e-commerce/orders',
                exactMatch: true
            },
            {
                id   : 'colors',
                title: 'Colors',
                type : 'item',
                icon : 'color_lens',
                url  : '/ui/colors'
            },
            {
                id   : 'sliders',
                title: 'Sliders',
                type : 'item',
                icon : 'picture_in_picture_alt',
                url  : '/ui/sliders'
            },
            {
                id   : 'categories',
                title: 'Categories',
                type : 'item',
                icon : 'category',
                url  : '/ui/categories'
            }
           
        ]
    },
    
];
