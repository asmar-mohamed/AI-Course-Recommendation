import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

export const API_BASE = 'http://localhost:8000'

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token to requests if present in localStorage
axiosInstance.interceptors.request.use((config:AxiosRequestConfig) => {
  try {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {
    // ignore
  }
  // notify that we attempted to reach the API
  try {
    window.dispatchEvent(new CustomEvent('api-status', { detail: { online: true } }))
  } catch (e) {}
  return config
})

// Response interceptor to handle auth errors and network connectivity
axiosInstance.interceptors.response.use(
  (resp) => {
    try { window.dispatchEvent(new CustomEvent('api-status', { detail: { online: true } })) } catch (e) {}
    return resp
  },
  (error) => {
    // Network error (no response) — likely backend down / CORS / connection refused
    if (!error.response) {
      try { window.dispatchEvent(new CustomEvent('api-status', { detail: { online: false, message: error.message } })) } catch (e) {}
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401) {
      // Remove auth and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
