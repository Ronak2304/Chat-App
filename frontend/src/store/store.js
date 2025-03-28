// Zustand is used to manage global states 
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false, // Loader function for signing up
    isLoggingIn:false, // Loader function for logging in
    isUpdatingProfile:false, // Loader function for updating profile
    isCheckingAuth:true  // Loader function for authUser
})) 
/*
    initial state of the user 
    custom state can use this like useState 
*/