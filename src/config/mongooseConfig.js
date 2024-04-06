
import mongoose from "mongoose";

import dotenv from 'dotenv';
//load env in application
dotenv.config();


export const connectUsingMongoose = async() => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('MongoDb is connected using mongoose');
    } catch (err) {
        console.log("Db Error");
        console.log(err);
    }
}