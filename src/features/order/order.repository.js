import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js"
import OrderModel from "./order.model.js";

export default class OrderRepository{

    constructor(){
        this.collection = "orders";
    }

    async placeOrder(userId){


        const client = getClient();
        const session = client.startSession();
        try {
            const db = getDB();
            session.startTransaction();
            // Get cartitems and calculate total amount
            const items  = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0)
            console.log(finalTotalAmount);

            // create an order record
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date())
            console.log(newOrder);
            await db.collection(this.collection).insertOne(newOrder,{session});

            // reduce the stock
            for(let item of items){
                await db.collection('products').updateOne(
                    {_id: item.productID},
                    {$inc:{stock: -item.quantity}},{session}
                )
            }

         //   throw new Error('something went wrong in dbb')
            // clear the cart items
            await db.collection('cartItems').deleteMany({
                userID: new ObjectId(userId)
            },{session})
            session.commitTransaction();
            session.endSession();
            return
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            console.log(err);
            throw new ApplicationError("Something went wrong in db",500)
        }
    }

    async getTotalAmount(userId, session){
        const db = getDB();
        const items = await db.collection('cartItems').aggregate([
            // get cart items for the user
            {
                $match:{userID: new ObjectId(userId)}
            },

            // Get the products from product collection
            {
                $lookup:{
                    from:'products',
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },

            // Unwind the productInfo
            {
                $unwind: "$productInfo"
            },

            // Calculate totalAmount for each cartitems
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            } 
        ], {session}).toArray();
        return items;
    }
}