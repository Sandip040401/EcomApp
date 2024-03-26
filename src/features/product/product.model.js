import UserModel from "../user/user.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
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

    static rateProduct(userID, productID, rating) {
        // 1. Validate user and product
        const user = UserModel.getAll().find(
            (u) => u.id == userID
            );
        if (!user) {
            throw new ApplicationError('User not found',404);
        }
    
        // Validate Product
        const product = products.find(
            (p) => p.id == productID
            );
        if (!product) {
            throw new ApplicationError('Product not found',400);
        }
        // 2. Check if there are any ratings and if not then add ratings array.
        if (!product.ratings) {
            product.ratings = [];
        }
    
        // 3. Check if user rating is already available.
        const existingRatingIndex = product.ratings.findIndex(r => r.userID === userID);
        if (existingRatingIndex >= 0) {
            product.ratings[existingRatingIndex].rating = rating;
        } else {
            // 4. if no existing rating, then add new rating.
            product.ratings.push({ userID: userID, rating: rating });
        }
    
        return null; // Return null to indicate no error
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