import CartItemModel from "./cart.model.js";
import CartItemsRepository from "./cart.repository.js";

export default class CartItemController{

    constructor(){
        this.cartItemsRepository = new CartItemsRepository();
    }

    async add(req,res){
        try {
            const {productId, quantity} = req.body;
            const userId = req.userID;
            await this.cartItemsRepository.add(productId, userId, quantity);
            res.status(201).send('Cart is updated');
        } catch (err) {
            return res.status(500).send('Something went wrong');
        }

    }

    async get(req,res) {
        try {
            const userId = req.userID;
            const items = await this.cartItemsRepository.get(userId);
            return res.status(200).send(items);
        } catch (err) {
            return res.status(500).send('Something went wrong');
        }

    }

    async delete(req,res) {
        try {
            const userId = req.userID;
            const cartItemId = req.params.id;
            const isDeleted = await this.cartItemsRepository.delete(userId,cartItemId);
            if(!isDeleted) {
                return res.status(404).send('Item not found');
            }
            return res.status(200).send('Cart item is removed');
        } catch (err) {
            return res.status(500).send('Something went wrong');
        }
    }
}