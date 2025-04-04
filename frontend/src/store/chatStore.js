import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useChatStore = create((set)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    isSendingMessage:false,
    
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
    },

    getMessages: async(id)=> {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${id}`)
            set({messages:res.data})
        } catch (error) {
            console.log("Error in message Loading "+error.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    selectUserChat: async(sUser)=>{
        set({selectedUser:sUser})
    },

    sendMessages: async(id,data)=>{
        set({isSendingMessage:true})
        try {
            const res = await axiosInstance.post(`/messages/${id}`,data)
                     
        } catch (error) {
            console.log("Error in sendmessages "+error.message)
        }finally{
            set({isSendingMessage:false})
        }
    }
}))