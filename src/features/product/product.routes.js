
// Manage routes/paths to ProductController

// Import express
import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

// Initialize express router
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to controller methods
productRouter.get('/', productController.getAllProducts);
productRouter.post('/', upload.single('imageUrl'),productController.addProduct);

productRouter.post('/rate',productController.rateProduct);




// Query parameters
// localhost:3200/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get('/filter', productController.filterProducts);


productRouter.get("/:id",productController.getOneProduct);


// export router
export default productRouter;