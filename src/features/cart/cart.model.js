
// productId, userId, quantity

export default class CartItemModel {
    constructor(id, productId, userId, quantity){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productId, userId, quantity) {

        const cartItem = new CartItemModel(
            cartItems.length + 1,
            productId,
            userId,
            quantity
        );
        cartItems.push(cartItem);
        console.log(cartItem);
        return cartItem;
    }

    static get(userId){
        return cartItems.filter(
            (i) => i.userId == userId
        );
    }

    static delete(cartItemId, userId) {
        const cartItemIndex = cartItems.findIndex(
            (i)=> i.id == cartItemId && i.userId == userId 
        );
        if(cartItemIndex == -1){
            return 'Item not found';
        } else{
            cartItems.splice(cartItemIndex,1);
        }
    }
}

let cartItems = [

];

