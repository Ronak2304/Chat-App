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
    }     
})) 
/*
    initial state of the user 
    custom state can use this like useState 
*/