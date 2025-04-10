import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app) // creates a server using inbuilt module of node

const io = new Server(server,{
    cors: { // cors: cross origin resource sharing
        origin: 'http://localhost:5173'
    } 
})

const onlineUsersMap = {}

export function getRecieverSocketId(userId){
    return onlineUsersMap[userId]
}

io.on("connection",(socket)=>{
    console.log("A user connected "+socket.id)
    
    const userId = socket.handshake.query.userId
    if(userId){
        onlineUsersMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(onlineUsersMap))

    socket.on("disconnect",()=>{
        console.log("A user disconnected "+socket.id)
        delete onlineUsersMap[userId]
        io.emit("getOnlineUsers",Object.keys(onlineUsersMap))
    })
})
export {app,io,server}