import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                try{
                        token = req.headers.authorization.split('')[1];
                        const decoded = jwt.verify(token, process.env.JWT_SECRET)
                        req.user = await User.findBy(decoded.id).select('-password');
                        next()
                }
                catch(error){
                        return  res.status(401).json({message: "Unauthorized, Token not matched"})
                }
        }

        if(!token) {
                return res.status(500).json({ message: "Not authorized, No token"})
        }
}

export default protect;