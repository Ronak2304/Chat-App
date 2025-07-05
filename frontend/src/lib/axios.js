import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/`,
    withCredentials: true  //passes cookies in every single request
})

export default axiosInstance