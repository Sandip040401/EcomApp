


// Manage routes/paths to OrderController

// Import express
import express from "express";
import OrderController from "./order.controller.js";

// Initialize express router
const orderRouter = express.Router();
const orderController = new OrderController();

// All the paths to controller methods
orderRouter.post('/', (req,res,next)=>{
    orderController.placeOrder(req,res,next)
});



// export router
export default orderRouter;