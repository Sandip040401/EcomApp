
import { MongoClient } from "mongodb";

// url for database connection
const url = "mongodb://localhost:27017/ecomdb";


let client;
export const connectToMongoDB = () =>{
    MongoClient.connect(url)
        .then(clientInstance =>{
            client = clientInstance;
            console.log('MongoDb is connected');
        })
        .catch(err=>{
            console.log(err);
        })
}


export const getDB = () => {
    return client.db();
}
 
