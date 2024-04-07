import UserModel from "./user.model.js";
import  jwt  from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }
    

    async resetPassword(req,res){
        const {newPassword} = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 12)
        const userId = req.userID;
        try {
            await this.userRepository.resetPassword(userId, hashedPassword)
            res.status(200).send('Password is Updated')
        } catch (err) {
            console.log(err);
        }
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
                    const token = jwt.sign({userID: user._id, email: user.email},process.env.JWT_SECRET,
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