
import mongoose from 'mongoose'
import { LikeSchema } from './like.schema.js'
import {ObjectId} from "mongodb"
import { ApplicationError } from '../../error-handler/applicationError.js';

const LikeModel =  mongoose.model('Like',LikeSchema)

export class LikeRepository{

    async getLikes(type,id){
        try {
            return await LikeModel.find({
                likeable: new ObjectId(id),
                types: type
            }).populate('user').populate({path:'likeable', model:type})
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }

    }

    async likeProduct(userId, productId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(productId),
                types:'Product'
            })
            await newLike.save()
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

    async likeCategory(userId, categoryId){
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable: new ObjectId(categoryId),
                types:'Category'
            })
            await newLike.save()
        } catch (err) {
            console.log(err);
            throw new ApplicationError('Something went wrong in db',500)
        }
    }

}