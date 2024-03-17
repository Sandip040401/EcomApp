import CartItemModel from "./cart.model.js";

export default class CartItemController{
    add(req,res){
        const {productId, quantity} = req.query;
        const userId = req.userID;

        CartItemModel.add(productId, userId, quantity);
        res.status(201).send('Cart is updated');
    }

    get(req,res) {
        const userId = req.userID;
        const items = CartItemModel.get(userId);
        return res.status(200).send(items);
    }

    delete(req,res) {
        const userId = req.userID;
        const cartItemId = req.params.id;
        const error = CartItemModel.delete(cartItemId, userId);
        if(error) {
            return res.status(404).send(error);
        }
        return res.status(200).send('Cart item is removed');
    }
}