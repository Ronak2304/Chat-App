import express from 'express';
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import dotenv from 'dotenv'
import connectDB from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app,server} from './lib/socket.js' 

dotenv.config();

const port = process.env.PORT

app.use(express.json()) // JSON middleware -> extract json data 
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //allow the cookies or authorization headers to be sent with the request
})) 
/*
    CORS-> Cross origin resource sharing also cors need to be installed
    by default browsers block CORS request as to protect server data from malicious websites but in some cases we need to allow it manually 
    as when frontend make api request to backend server then we need to manually allow this and pass the port on which the frontend is running 
 */

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
// app.get('/',(req,res)=>{
//     res.send("HELLO WORLD");
// })

server.listen(port,()=>{
    console.log("Re-Rendering port: "+port);
    connectDB()
})