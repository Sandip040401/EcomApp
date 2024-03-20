// Import Express
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors';
import apiDocs from "./swagger.json" assert {type:'json'};
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cart.routes.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
// import basicAuth from './src/middlewares/basicAuth.middleware.js';
// import bodyParser from 'body-parser';

// Create Server
const server = express();


// CORS Policy 
// Using npm i cors
server.use(cors());

// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers','*');
//     res.header('Access-Control-Allow-Methods','*');
//     // return ok for preflight request
//     if(req.method=='OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// })

// npm install body-parser
// for json format
// server.use(bodyParser.json());
server.use(express.json()) 

// bearer token
// Bearer <token>

// Swagger api docs
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs));

//logger middleware
server.use(loggerMiddleware);

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

// Error handler middleware

server.use((err,req,res,next)=>{
    // log error to the logger file
    res.status(503).send("Something went wrong please try later")
})



// Middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found");
})

// Specify Port
server.listen(3200, ()=>{
    console.log("Server is running at 3200");
});