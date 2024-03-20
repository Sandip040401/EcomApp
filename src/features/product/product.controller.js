import ProductModel from "./product.model.js";

export default class ProductController{

    getAllProducts(req,res){
        const product = ProductModel.getAll();
        res.status(200).send(product);
    }

    addProduct(req, res){
        const { name, price, sizes } = req.body;
        const newProduct = {
         name,
         price: parseFloat(price),
         sizes: sizes ? sizes.split(',') : [], // Check if sizes is defined before splitting
         imageUrl: req.file.filename,
        };
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
     }
     

    rateProduct(req, res) {
        console.log(req.query);
        const userId = req.query.userId;
        const productId = req.query.productId;
        const rating = parseFloat(req.query.rating); // Ensure rating is converted to a number
    
        try{
           ProductModel.rateProduct(userId, productId, rating);
        } catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(200).send('Rating has been added');
    }

    getOneProduct(req,res){
        const id = req.params.id;
        const product = ProductModel.get(id);
        if(!product) {
            res.status(404).send('Product not found');
        }else {
            return res.status(200).send(product);
        }
    }

    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = ProductModel.filter(minPrice, maxPrice, category);
        res.status(200).send(result);
    }
}