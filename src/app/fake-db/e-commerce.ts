export class ECommerceFakeDb
{
    public static products = [
        {
            'id'              : '1',
            'name'            : 'VOPSEA DECORATIVĂ CU EFECT DE MĂTASE SAU CU NISIP1 L– OYSTAR – TIXE',
            'handle'          : 'vopsea-decorativa-oystar',
            'description'     : 'OYSTAR este o pictură decorativă netedă cu perle de mătase sau cu nisip, care este ușor de aplicat și are o acoperire excelentă. Datorită pigmenților prețioși, OYSTAR îmbracă suprafețele tratate cu un aspect perle excepțional, cu efect tactil, obținând astfel medii moderne cu efecte cromatice care variază în funcție de înclinația luminii.',
            'categories'      : [
                'Vopsea decorativa cu efect special',
                'Vopsea decorativa de interior'
            ],
            'tags'            : [
                'vopsea',
                'vopsea-decorativa'
            ],
            'featuredImageId' : 1,
            'images'          : [
                {
                    'id'  : 0,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 1,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 2,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 3,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 4,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 5,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 6,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 7,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 8,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                },
                {
                    'id'  : 9,
                    'url' : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg',
                    'type': 'image'
                }
            ],
            'priceTaxExcl'    : 9.309,
            'priceTaxIncl'    : 10.24,
            'taxRate'         : 10,
            'comparedPrice'   : 19.90,
            'quantity'        : 3,
            'sku'             : 'A445BV',
            'width'           : '22',
            'height'          : '24',
            'depth'           : '15',
            'weight'          : '3',
            'extraShippingFee': 3.00,
            'active'          : true
        },
       
       
    ];

    public static orders = [
        {
            'id'             : 1,
            'reference'      : '70d4d7d0',
            'subtotal'       : '39.97',
            'tax'            : '77.44',
            'discount'       : '-10.17',
            'total'          : '160',
            'date'           : '2020/04/25 02:07:59',
            'customer'       : {
                'id'             : 1,
                'firstName'      : 'Alex',
                'lastName'       : 'Manta',
                'avatar'         : 'https://media-exp1.licdn.com/dms/image/C4D03AQEUBFzRAL9m9Q/profile-displayphoto-shrink_100_100/0?e=1602720000&v=beta&t=bc7FkJxoATXKfHRCM_Sq6mKNGsOoJZ_z8kE9akvlTGg',
                'company'        : 'Terra',
                'jobTitle'       : 'Digital Archivist',
                'email'          : 'alexandru.manta@hotmail.com',
                'phone'          : '+40785696811',
                'invoiceAddress' : {
                    'address': 'Soseaua Pantelimon 352',
                    'lat'    : 44.4411895,
                    'lng'    : 26.1746886
                },
                'shippingAddress': {
                    'address': 'Soseaua Pantelimon 352',
                    'lat'    : 44.4411895,
                    'lng'    : 26.1746886
                }
            },
            'products'       : [
                {
                    'id'      : 1,
                    'name'    : 'VOPSEA DECORATIVĂ CU EFECT DE MĂTASE SAU CU NISIP1 L– OYSTAR – TIXE',
                    'price'   : '160',
                    'quantity': 1,
                    'total'   : '160',
                    'image'   : 'https://pro-staff.ro/wp-content/uploads/2019/03/oystar.jpeg'
                },
               
            ],
            'status'         : [
                {
                    'id'   : 13,
                    'name' : 'On pre-order (not paid)',
                    'color': 'purple-300',
                    'date' : '2020/04/03 10:06:18'
                },
                {
                    'id'   : 1,
                    'name' : 'Awaiting check payment',
                    'color': 'blue-500',
                    'date' : '2020/03/17 18:28:37'
                }
            ],
            'payment'        : {
                'transactionId': '2a894b9e',
                'amount'       : '160',
                'method'       : 'Card',
                'date'         : '2020/02/23 15:50:23'
            },
            'shippingDetails': [
                {
                    'tracking': '',
                    'carrier' : 'Fan courier',
                    'weight'  : '10.44',
                    'fee'     : '7.00',
                    'date'    : '2020/04/10 07:03:52'
                }
            ]
        },
        
    ];
}
