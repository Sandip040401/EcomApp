
import mongoose from "mongoose";

import dotenv from 'dotenv';
import { categorySchema } from "../features/product/category.schema.js";
import { ApplicationError } from "../error-handler/applicationError.js";
//load env in application
dotenv.config();


export const connectUsingMongoose = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('MongoDb is connected using mongoose');
        addCategories();
    } catch (err) {
        console.log("Db Error");
        console.log(err);
    }
}

async function addCategories(){
    try {
        const CategoryModel = mongoose.model('Category', categorySchema)
        const categories = await CategoryModel.find();
        if(!categories || categories.length==0){
            await CategoryModel.insertMany([{name:'Books'},{name:'Clothings'},{name:'Electronics'}])
        }
        console.log('Categories are added');
    } catch (err) {
        console.log(err);
        throw new ApplicationError('Something went wrong in database',500)
    }
}