import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwtToken;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized-No Token Found"
            })
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized-Invalid Token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password") // deselecting password so that password is not passed to client

        if(!user){
            return res.status(404).json({
                message:"User Not found"
            })
        }

        req.user = user

        next() //  once the authentication is done then only it will pass the access to the next function  
    } catch (error) {
        console.log("Error in authMiddleware: "+ error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}