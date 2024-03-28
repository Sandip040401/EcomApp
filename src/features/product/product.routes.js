
// Manage routes/paths to ProductController

// Import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// Initialize express router
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to controller methods
productRouter.get('/', (req,res)=>{
    productController.getAllProducts(req,res)
});
productRouter.post('/', upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res)
});

productRouter.post('/rate',(req,res)=>{
    productController.rateProduct(req,res)
});




// Query parameters
// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter',(req,res)=>{
    productController.filterProducts(req,res)
});


productRouter.get("/:id",(req,res)=>{
    productController.getOneProduct(req,res)
});


// export router
export default productRouter;