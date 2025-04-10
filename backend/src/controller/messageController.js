import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const sideBarUsers = async(req,res) => {
    try {
        const userId = req.user._id
        const filteredData = await User.find({_id:{$ne:userId}}).select("-password") // .find gives all the users in database but we do not want ourselves in the list thus we say using _id not equal to userId which mean do not select the user with this particular id and then in the end we jus removed password from each user as this data is being sent to the client so safegaurding the data by not sending the password
        res.status(200).json(filteredData)
    } catch (error) {
        console.log("Error in sideBarUsers: "+ error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getMessages = async(req,res) => {
    try {
        const {id} = req.params //receivers id 
        const senderId = req.user._id //senders id who is authenticated and is viewing a chat thus is the url we'll get other person's id
        const messages = await Message.find({
            $or: [
                {
                    senderId:senderId,
                    recieverId:id
                },
                {
                    senderId:id,
                    recieverId:senderId
                }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages: " + error.message)
        res.status(500).json({
            message:"Internal server Error"
        })
    }
}

export const sendMessages = async(req,res) => {
    try {
        const {text,image} = req.body
        const {id} = req.params
        const senderId = req.user._id
        
        let imageUrl;
        
        if(image){
            const uploadImage = await cloudinary.uploader.upload(image)
            imageUrl = uploadImage.secure_url
        }

        const newMessage = new Message({
            senderId,
            recieverId:id,
            textMessage: text,
            imageMessage: imageUrl
        })

        await newMessage.save()

        const recieverSocketId = getRecieverSocketId(id)
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error in sendMessages "+error.message)
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}