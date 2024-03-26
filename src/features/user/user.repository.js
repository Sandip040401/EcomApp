import { ApplicationError } from "../../error-handler/applicationError.js";


class UserRepository{

    async signUp(newUser){

        try{
        // Get the database
        const db = getDB();

        // Get the collection
        const collection = db.collection('users');

        // Insert the document
        await collection.insertOne(newUser);

        return newUser;

        }catch(err){
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }
}

export default UserRepository