import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository;
    }

    async getAllProducts(req,res){
        try {
            const product = await this.productRepository.getAll();
            res.status(200).send(product);
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went Wrong');
        }
    }

    async addProduct(req, res){
        try{
            const { name,desc, price,category, sizes } = req.body;
            const newProduct = new ProductModel(name, desc,parseFloat(price),req.file.filename, category, sizes.split(','), );
            const createdRecord = await this.productRepository.add(newProduct);
            res.status(201).send(createdRecord);
        } catch(err){
            console.log(err);
            return res.status(500).send('Something went Wrong');
        }

     }
     

    async rateProduct(req, res) {
        const userId = req.userID;
        const productId = req.body.productId;
        const rating = parseFloat(req.body.rating); // Ensure rating is converted to a number
    
        try{
          await this.productRepository.rate(userId, productId, rating);
        } catch(err){
            return res.status(400).send(err.message);
        }
        return res.status(200).send('Rating has been added');
    }

    async getOneProduct(req,res){
        try {
            const id = req.params.id;
            const product = await this.productRepository.get(id);
            if(!product) {
                res.status(404).send('Product not found');
            }else {
                return res.status(200).send(product);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went Wrong');
        }
    }

    async filterProducts(req, res) {
        try{
            const minPrice = req.query.minPrice;
          //  const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productRepository.filter(minPrice,category);
            res.status(200).send(result);
        }catch (err) {
            console.log(err);
            return res.status(500).send('Something went Wrong');
        }
    }

    async averagePrice(req,res,next){
        try {
            const result = await this.productRepository.averageProductPricePerCategory;
            res.status(200).send(result);
        } catch (err) {
            return res.status(500).send('Something went Wrong');
        }
    }
}