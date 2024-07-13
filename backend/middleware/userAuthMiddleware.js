import jwt from "jsonwebtoken"
import JWT_SECRET from "../config.js"


const authMiddleWare = (req,res,next) => {

    // Get the token from the request header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Check if no token is provided
    if (!token) {
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach the decoded user info to the request object
        req.username = decoded;

        // Proceed to the next middleware or route handler
        next();
        
    } catch (error) {
        // Return an error if the token is invalid
        res.status(400).send({ error: 'Invalid token' });
    }
}

export {authMiddleWare}