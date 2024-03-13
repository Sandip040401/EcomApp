

export default class ProductModel{

    constructor(id, name, desc, price, imageUrl, category, sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static getAll() {
        return products;
    }
}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        199.99,
        'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?cs=srgb&dl=pexels-kawaiiart-1767434.jpg&fm=jpg',
        'category 1',
        ['M', 'XL', 'S'],
    )
];