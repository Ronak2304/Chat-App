import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://chat-app-ifpy.onrender.com/api/',
    withCredentials: true  //passes cookies in every single request
})

export default axiosInstance