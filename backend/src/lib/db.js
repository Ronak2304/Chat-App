import mongoose from 'mongoose'

const connectDB = async(req,res)=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("MongoDB Connection Error: "+error)
    }
}

export default connectDB;