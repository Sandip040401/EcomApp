// Import Express
import express from 'express';
import swagger from 'swagger-ui-express';
import apiDocs from "./swagger.json" assert {type:'json'};
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
// import basicAuth from './src/middlewares/basicAuth.middleware.js';
// import bodyParser from 'body-parser';

// Create Server
const server = express();


// npm install body-parser
// for json format
// server.use(bodyParser.json());
server.use(express.json()) 



// Swagger api docs
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

// For all requests related to product, redirect to product routes
server.use("/api/products",jwtAuth, productRouter);

// For all requests related to user, redirect to user routes
server.use("/api/users", userRouter);

// For all requests related to cart, redirect to cart routes
server.use("/api/cartItems",jwtAuth, cartRouter);

// Default request handler
server.get('/', (req,res)=>{
    res.send("Welcome to Ecom App");
})

// Specify Port
server.listen(3200, ()=>{
    console.log("Server is running at 3200");
});