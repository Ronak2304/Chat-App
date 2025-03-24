// Controllers contain all the business logic
import bcrypt from 'bcryptjs'
import User from "../models/userModel.js";
import generateToken from '../lib/utils.js';

export const signup = async (req,res) => {
    const {email,fullName,password} = req.body;
    try {
        if (!fullName || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password must be at least 6 chars"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"User Already Exists"
            })
        }
        const salt = await bcrypt.genSalt(); // it generates a string with random 10 chars and by default 10 because no number is specified
        const hashedPassword = await bcrypt.hash(password,salt)
        // console.log(hashedPassword)
        
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })
        
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                userId:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }
        else{
            res.status(400).json({
                message:"Invalid User Data"
            })
        }
    } catch (error) {
        console.log("Error in signup "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const passTest = await bcrypt.compare(password,user.password)
            if(passTest){
                generateToken(user._id,res)
                res.status(200).json({
                    userId:user._id,
                    email:user.email,
                    fullName:user.fullName,
                    profilePic:user.profilePic
                })

            }else{
                return res.status(400).json({
                    message:"Invalid Credentials"
                })
            }
        }
        else{
            res.status(400).json({
                message:"Invalid Credentials"
            })
        }
    } catch (error) {
        console.log("Error: "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const logout = (req,res) => {
    try {
        res.cookies("jwtToken","",{
            maxAge:0
        })//jwtToken ko humne ""/empty kardiya and maxAge bhi kardi basically remove kardiya token  
        res.status(200).json({
            message:"Logged Out Successfully"
        })
    } catch (error) {
        console.log("Error: "+error.message)
        res.status(500).json({
            messag:"Internal Server Error"
        })
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {newprofilePic} = req.body
        const userId = req.user._id
    
        if(!newprofilePic){
            return res.status(400).json({
                message:"Profile Pic is required"
            })
        }
    
        const uploadResponse = await cloudinary.uploader.upload(newprofilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{
            profilePic: uploadResponse.secure_url
        },{
            new:true
        })
    
        res.status(201).json({
            updatedUser
        })
    } catch (error) {
        console.log("Error in updateProfile: "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in checkAuth: "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}