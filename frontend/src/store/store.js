// Zustand is used to manage global states 
import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import {io} from 'socket.io-client'

export const useAuthStore = create((set,get)=>({
    authUser:null, //Stores the data of the authenticated user
    isSigningUp:false, // Loader function for signing up
    isLoggingIn:false, // Loader function for logging in
    isUpdatingProfile:false, // Loader function for updating profile
    isCheckingAuth:true,  // Loader function for authUser
    socket:null,
    onlineUsers: [],

    connectSocket: async () => {
        const {authUser} = get()

        if(!authUser || get().socket?.connected){ //socket? => implies that it will first check if socket is not null or undefined then only it will check for the next condition that is connected 
            return 
        }
        const socket = io('http://localhost:3000',{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket})
        
        socket.on("getOnlineUsers",(Ids)=>{
            set({onlineUsers:Ids})
        })
           
    },
    disconnectSocket: async () => {
        if(get().socket?.connected){
            get().socket?.disconnect()
        }
    },
    checkAuth: async () => {
        try {
            const res = await axiosInstance('/auth/check')
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth "+error.message)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            console.log("successfully created user "+res.data)
            get().connectSocket() 
        } catch (error) {
            console.log("Error in signup "+error.message)
            set({isSigningUp:false})
        }finally{
            set({isSigningUp:false})
        }
    },
    logout: async()=>{
        try {
            const res = await axiosInstance.get('/auth/logout')
            set({authUser:null})
            console.log(res.message)
            get().disconnectSocket()
        } catch (error) {
            console.log("Error in logout "+error.message)
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            if(res.data){
                console.log("Successfully logged in "+res.data)
                set({authUser:res.data})
            }
            get().connectSocket() 
            
        } catch (error) {
            console.log("Error in Login "+error.message)
        } finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile: async(data) =>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put('/auth/update-profile',data)
            set({authUser:res.data})
            console.log("Updated successfully")

        } catch (error) {
            console.log("Error in update profile ")+error.message
        }finally{
            set({isUpdatingProfile:false})
        }
    }
})) 
/*
    initial state of the user 
    custom state can use this like useState 
*/