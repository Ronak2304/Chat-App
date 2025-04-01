// Zustand is used to manage global states 
import {create} from 'zustand'
import axiosInstance from '../lib/axios'

export const useAuthStore = create((set)=>({
    authUser:null, //Stores the data of the authenticated user
    isSigningUp:false, // Loader function for signing up
    isLoggingIn:false, // Loader function for logging in
    isUpdatingProfile:false, // Loader function for updating profile
    isCheckingAuth:true,  // Loader function for authUser
    checkAuth: async () => {
        try {
            const res = await axiosInstance('/auth/check')
            set({authUser:res.data})
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
            
        } catch (error) {
            console.log("Error in Login "+error.message)
        } finally{
            set({isLoggingIn:false})
        }
    }


})) 
/*
    initial state of the user 
    custom state can use this like useState 
*/