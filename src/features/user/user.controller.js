import UserModel from "./user.model.js";
import  jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async signUp(req,res){
        try{
        const { name, email, password, type } = req.body;
        
        //hash password
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new UserModel(name, email, hashedPassword, type);
        await this.userRepository.signUp(user);
        res.status(201).send(user);
        }catch(err){
            console.log(err);
        }
    }

    async signIn(req,res){
        try{
            // Find user by email
            const user = await this.userRepository.findByEmail(req.body.email);
            if(!user){
                    return res.status(400).send("Incorrect Credentials");
                }else{
                    // compare password with hashed password
                    const result = await bcrypt.compare(req.body.password,user.password)
                    if(result){
                    // create token
                    const token = jwt.sign({userID: result.id, email: result.email},"df9DU2NjOQVH7Kyq0zi96IF1izOWah93",
                    {
                        expiresIn: '1h',
                    });

                    // Send token
                    return res.status(200).send(token);
                    }else{
                    return res.status(400).send("Incorrect Credentials");
                    }
                }
            }catch(err){
                console.log(err);
                return res.status(500).send('Something went Wrong');
        }
    }

}