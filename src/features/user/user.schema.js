import mongoose from "mongoose";

export const userSchema =  new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required:true,
        match: [/.+\@.+\../,"Please enter a valid Email"]
    },
    
    password: String,
    // password: {type:String,
    //     validate:{
    //         validator: function(value){
    //             return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value)
    //         },
    //         message: "Password should be between 8-12 characters"
    //     }
    // },
    type: { type: String, enum: ['Customer', 'Seller'] }
});
