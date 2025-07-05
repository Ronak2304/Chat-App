import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true  //passes cookies in every single request
})

export default axiosInstance