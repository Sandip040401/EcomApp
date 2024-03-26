import UserModel from "./user.model.js";
import  jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";
export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async signUp(req,res){
        try{
        const { name, email, password, type } = req.body;
        const user = new UserModel(name, email, password, type);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
        }catch(err){
            console.log(err);
        }
    }

    signIn(req,res){
        const result = UserModel.signIn(req.body.email, req.body.password);
        if(!result){
            return res.status(400).send("Incorrect Credentials");
        }else{

            // create token
            const token = jwt.sign({userID: result.id, email: result.email},"df9DU2NjOQVH7Kyq0zi96IF1izOWah93",
            {
                expiresIn: '1h',
            });

            // Send token
            return res.status(200).send(token);
        }
    }

}