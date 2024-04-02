import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js"

class ProductRepository{

    constructor(){
        this.collection = 'products';
    }

    // Add new product 
    async add(newProduct){

        try {

            //get the db
            const db = getDB();

            // get the collection
            const collection = db.collection(this.collection);

            // Insert the document
            await collection.insertOne(newProduct);

            return newProduct;

        } catch(err){
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    // Get all product
    async getAll(){
        try {
            
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        }catch(err){
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    // Get one product
    async get(id){
        try {
            
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }


    // Filter product
    async filter(minPrice, category){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }
            // categories = JSON.parse(categories.replace(/'/g, '"'));
            if(category){
                filterExpression = {$and:[{category:category}, filterExpression]}
                // filterExpression = {$or:[{category:category}, filterExpression]}
                // filterExpression = {$and:[{category:{$in:categories}}, filterExpression]}

                //filterExpression.category = category
            }

            return await collection.find(filterExpression).toArray();
          //  return await collection.find(filterExpression).project({name:1,price:1, _id:0,rating:{$slice:1}}).toArray();
        } catch (err) {
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    // rate product
    // async rate(userID, productID, rating){
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         // Find the product
    //         const product = await collection.findOne({_id: new ObjectId(productID)});
    //         // find the rating
    //         const userRating = product?.ratings?.find(r=>r.userID==userID);
    //         if(userRating){
    //             // update the rating
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID),"ratings.userID": new ObjectId(userID)
    //             },{
    //                 $set:{
    //                     "ratings.$.rating":rating
    //                 }
    //             })
    //         }else{
    //             await collection.updateOne({
    //                 _id: new ObjectId(productID)
    //             },{
    //                 $push:{
    //                     ratings:{userID: new ObjectId(userID),rating} 
    //                 }
    //             })
    //          }
    //     } catch (err) {
    //         throw new ApplicationError('Something went wrong with database', 500);
            
    //     }
    // }


    async rate(userID, productID, rating){
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
         
            await collection.updateOne({
                _id: new ObjectId(productID)
            },{
                $pull:{ratings:{
                    userID: new ObjectId(userID)
                }}
            })
            
            await collection.updateOne({
                    _id: new ObjectId(productID)
                },{
                    $push:{
                        ratings:{userID: new ObjectId(userID),rating} 
                    }
                })
        } catch (err) {
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    async averageProductPricePerCategory(){
        try {
            const db =getDB();
            return await db.collection(this.collection)
            .aggregate([
                {
                    // get average price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();
        } catch (err) {
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }
}

export default ProductRepository