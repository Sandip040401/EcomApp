import {ApplicationError} from '../../error-handler/applicationError.js'
import {getDB} from "../../config/mongodb.js"
import { ObjectId } from 'mongodb';

export default class CartItemsRepository{

    constructor(){
        this.collection = 'cartItems'
    }

    async add(productID, userID, quantity){
        try{
            const db = getDB();
            const collection = db.collection(this.collection)
            // const id = await this.getNextCounter(db);
            // console.log(id);
            // find the document
            // either insert or update
            await collection.updateOne(
                {productID: new ObjectId(productID), userID: new ObjectId(userID)},
                {
                    // $setOnInsert: {_id:id},
                    $inc:{
                    quantity:quantity
                 }},
                 {upsert: true})
        }catch(err){
            throw new ApplicationError("Something went wrong with database",500)
        }
    }

    async get(userID){
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            return await collection.find({userID: new ObjectId(userID)}).toArray();
        } catch (err) {
            throw new ApplicationError("Something went wrong with database",500)
        }
    }

    async delete(userID, cartItemId){
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            const result = await collection.deleteOne({_id: new ObjectId(cartItemId), userID: new ObjectId(userID)})
            return result.deletedCount>0;
        } catch (err) {
            throw new ApplicationError("Something went wrong with database",500)
        }
    }

    // async getNextCounter(db){
    //     const resultDocument = await db.collection('counters').findOneAndUpdate(
    //         {_id:'cartItemId'},
    //         {$inc:{value:1}},
    //         {returnDocument:'after'}
    //     )
    //     return resultDocument.value;
    // }
}