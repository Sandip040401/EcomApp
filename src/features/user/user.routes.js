
// Manage routes/paths to UserController

// Import express
import express from "express";
import UserController from "./user.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

// Initialize express router
const userRouter = express.Router();
const userController = new UserController();

// All the paths to controller methods
userRouter.post('/signup',(req,res) => {
    userController.signUp(req,res)
});
userRouter.post('/signin',(req,res) => {
    userController.signIn(req,res)
});

userRouter.put('/resetPassword',jwtAuth,(req,res) => {
    userController.resetPassword(req,res)
})

// export router
export default userRouter;