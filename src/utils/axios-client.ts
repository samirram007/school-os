import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/env'

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

// Create Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: env.VITE_API_BASE_URL || '/api',
  withCredentials: ['localStorage','sessionStorage'].includes(env.VITE_AUTH_STORAGE ?? '') ? false : true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
     
  },
})

/**
 * Refresh token handler
 * Uses the global axios instance to avoid interceptor loops
 */
async function refreshToken(): Promise<void> {
  try {
    await axios.post(
      `${env.VITE_API_BASE_URL || '/api'}/auth/refresh`,
      {},
      { withCredentials: true }
    )
  } catch (error) {
   // console.error('🔁 Token refresh failed:', error)
    throw error
  }
}

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    //console.log('Outgoing request:', config.method?.toUpperCase(), config.url)
     const token = env.VITE_AUTH_STORAGE === 'localStorage' ? localStorage.getItem('token') : sessionStorage.getItem('token');
     const xTenantKey = env.VITE_APP_TENANT_KEY || '';
     config.headers['x-tenant-key'] = xTenantKey;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // Cast config to our retryable type
    const originalRequest = error.config as RetryableRequestConfig | undefined

    // If there is no config, we cannot retry the request
    if (!originalRequest) {
      return Promise.reject(error)
    }

    const status = error.response?.status

    // Check if we are on an auth-related route or if the request itself is auth-related
    const isAuthRoute =
      window.location.pathname.includes('/sign-in') ||
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/login')

    // Handle 401 Unauthorized errors by attempting to refresh the token
    if (status === 401 && !originalRequest._retry && !isAuthRoute) {
      originalRequest._retry = true
      try {
        await refreshToken()
        // Retry the original request with the new session/token
        return axiosClient(originalRequest)
      } catch (refreshError) {
        console.error('❌ Session expired. Redirecting to sign-in.')

        // If refresh fails, redirect to sign-in page
        if (!window.location.pathname.includes('/sign-in')) {
          window.location.href = '/sign-in'
        }
        return Promise.reject(refreshError)
      }
    }

    // Standard error logging for non-401 errors
    if (status) {
      const messages: Record<number, string> = {
        400: 'Bad Request',
        403: 'Forbidden',
        404: 'Not Found',
        422: 'Validation Failed',
        500: 'Internal Server Error',
      }

      const message = messages[status]
      if (message) {
        console.warn(`[API Error ${status}] ${message}:`, originalRequest.url)
      }
    } else if (error.message) {
      console.error('[Network Error]:', error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosClient
