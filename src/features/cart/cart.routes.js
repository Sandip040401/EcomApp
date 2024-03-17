
import express from 'express';
import CartItemController from "./cart.controller.js";

const cartRouter = express.Router();

const cartController = new CartItemController();

cartRouter.post('/', cartController.add);
cartRouter.get('/', cartController.get);
cartRouter.delete('/:id', cartController.delete);




export default cartRouter;