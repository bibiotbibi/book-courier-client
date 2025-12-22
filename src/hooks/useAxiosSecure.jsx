import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      // Request interceptor to attach Firebase ID token
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async config => {
          const token = await user.getIdToken() // 🔑 get the correct Firebase ID token
          config.headers.Authorization = `Bearer ${token}`
          return config
        }
      )

      // Response interceptor to handle 401/403
      const responseInterceptor = axiosInstance.interceptors.response.use(
        res => res,
        err => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => console.log('Logged out successfully'))
              .catch(console.error)
            navigate('/login')
          }
          return Promise.reject(err)
        }
      )

      // Cleanup interceptors on unmount/re-render
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor)
        axiosInstance.interceptors.response.eject(responseInterceptor)
      }
    }
  }, [user, loading, logOut, navigate])

  return axiosInstance
}

export default useAxiosSecure
