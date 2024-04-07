
// Manage routes/paths to likeController

// Import express
import express from "express";
import { LikeController } from "./like.controller.js";

// Initialize express router
const likeRouter = express.Router();
const likeController = new LikeController();

// All the paths to controller methods
likeRouter.post('/',(req,res) => {
    likeController.likeItem(req,res)
});

likeRouter.get('/',(req,res) => {
    likeController.getLikes(req,res)
});

// export router
export default likeRouter;