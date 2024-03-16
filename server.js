// Import Express
import express from 'express';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuth from './src/middlewares/basicAuth.middleware.js';
// import bodyParser from 'body-parser';

// Create Server
const server = express();


// npm install body-parser
// for json format
// server.use(bodyParser.json());
server.use(express.json()) 

// For all requests related to product, redirect to product routes
server.use("/api/products",basicAuth, productRouter);

// For all requests related to user, redirect to user routes
server.use("/api/users", userRouter);

// Default request handler
server.get('/', (req,res)=>{
    res.send("Welcome to Ecom App");
})

// Specify Port
server.listen(3200, ()=>{
    console.log("Server is running at 3200");
});