import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=> {

    // Read the token
    const token = req.headers['authorization'];

    // if no token return error
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    // check if token is valid
    try{
       const payload = jwt.verify(
        token, 
        "df9DU2NjOQVH7Kyq0zi96IF1izOWah93"
        );
        req.userID = payload.userID;
    }
    catch(err){
    // return error
        return res.status(401).send('Unauthorized');
    }

    // call next middleware
    next();
};

export default jwtAuth;