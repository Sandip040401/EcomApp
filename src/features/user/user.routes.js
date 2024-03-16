
// Manage routes/paths to UserController

// Import express
import express from "express";
import UserController from "./user.controller.js";

// Initialize express router
const userRouter = express.Router();
const userController = new UserController();

// All the paths to controller methods
userRouter.post('/signup',userController.signUp);
userRouter.post('/signin',userController.signIn);


// export router
export default userRouter;