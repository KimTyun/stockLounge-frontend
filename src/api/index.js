import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URI

const axiosApi = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export default axiosApi
