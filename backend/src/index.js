import express from 'express';
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser'


dotenv.config();

const app = express()
const port = process.env.PORT

app.use(express.json()) // JSON middleware -> extract json data 
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
// app.get('/',(req,res)=>{
//     res.send("HELLO WORLD");
// })

app.listen(port,()=>{
    console.log("Re-Rendering port: "+port);
    connectDB()
})