

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

    static add(product) {
        product.id = products.length + 1;
        products.push(product);
        return product;
    }

    static get(id) {
        const product = products.find(i => i.id==id);
        return product;
    }

    static getAll() {
        return products;
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter((product) => {
            return (
            product.price >= minPrice && 
            product.price <= maxPrice &&
            product.category == category
            );
        });
        return result;
    }
}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?cs=srgb&dl=pexels-kawaiiart-1767434.jpg&fm=jpg',
        'Category1',
        ['M', 'XL', 'S'],
    )
];