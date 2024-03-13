// Import Express
import express from 'express';
import productRouter from './src/features/product/product.routes.js';

// Create Server
const server = express();


// For all requests related to product, redirect to product routes
server.use("/api/products", productRouter);

// Default request handler
server.get('/', (req,res)=>{
    res.send("Welcome to Ecom App");
})

// Specify Port
server.listen(3200, ()=>{
    console.log("Server is running at 3200");
});