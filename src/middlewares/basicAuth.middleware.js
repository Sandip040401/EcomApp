
// Basic Auth is not  required as we are using jwtAuth

import UserModel from "../features/user/user.model.js";

const basicAuth = (req,res,next) => {

        // Check if authorization header is empty

        const authHeader = req.headers["authorization"];

        if(!authHeader){
            return res.status(401).send("No authorization details found");
        }

        console.log(authHeader);
        // Extract credentials

        const base64Credentials = authHeader.replace('Basic ','');
        console.log(base64Credentials);
        // Decode credentials

        const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8');
        console.log(decodedCreds);
        const creds = decodedCreds.split(':');

        const user = UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);

        if(user){
            next();
        }
        else{
            return res.status(401).send('Invalid credentials');
        }
}

export default basicAuth;