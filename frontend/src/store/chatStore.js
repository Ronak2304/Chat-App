import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "./store";

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isSendingMessage:false,
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
    },

    getMessages: async(id)=> {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${id}`)
            set({messages:res.data})

            const socket = useAuthStore.getState().socket

            socket.off("newMessage");

            socket.on("newMessage",(newMessage)=>{
                set({
                    messages: [...get().messages,newMessage]
                })
            })

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
        const {messages} = get()
        set({isSendingMessage:true})
        try {
            const res = await  axiosInstance.post(`/messages/send/${id}`,data)
            set({messages:[...messages,res.data]})
        } catch (error) {
            console.log("Error in sendmessages "+error.message)
        }finally{
            set({isSendingMessage:false})
        }
    }
}))