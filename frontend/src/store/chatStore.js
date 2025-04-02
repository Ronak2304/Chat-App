import { create } from "zustand";
import axiosInstance from "../lib/axios";



export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    
    getUser: async() => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/messages/users')
            set({users:res.data})
            
        } catch (error) {
            console.log("Error in getusers "+error.message)
        }finally{
            set({isUsersLoading:false})
        }
    }
}))