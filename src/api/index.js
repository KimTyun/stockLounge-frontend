import axios from 'axios'

const apiUrI = import.meta.env.VITE_API_URI
const baseURL = `${apiUrI}/api`

const axiosApi = axios.create({
   baseURL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export default axiosApi
