
// productId, userId, quantity

export default class CartItemModel {
    constructor(id, productId, userId, quantity){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }
}

let cartItems = [];

