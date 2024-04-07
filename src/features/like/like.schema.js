
import mongoose from 'mongoose'

export const LikeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        refPath:'types'
    },
    types:{
        type: String,
        enum: ['Product','Category']
    }
}).pre('save',(next)=>{
    console.log('New Log Coming in');
    next();
}).post('save',(doc)=>{
    console.log("likes is saved");
    console.log(doc);
}).pre('find',(next)=>{
    console.log("retriving likes");
    next();
}).post('find',(docs)=>{
    console.log("find is completed");
    console.log(docs);
})