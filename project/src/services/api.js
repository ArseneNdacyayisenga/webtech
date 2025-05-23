import axios from 'axios'

// Create axios instance with base URL
// In a real app, this would point to your Spring Boot backend
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {}
    
    // Handle authentication errors
    if (status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

// Export service functions for different entities
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  verify2FA: (data) => api.post('/auth/verify-2fa', data),
}

export const rideService = {
  getRides: (params) => api.get('/rides', { params }),
  getRideById: (id) => api.get(`/rides/${id}`),
  createRide: (data) => api.post('/rides', data),
  updateRide: (id, data) => api.put(`/rides/${id}`, data),
  cancelRide: (id) => api.delete(`/rides/${id}`),
}

export const paymentService = {
  getPaymentMethods: () => api.get('/payments/methods'),
  addPaymentMethod: (data) => api.post('/payments/methods', data),
  removePaymentMethod: (id) => api.delete(`/payments/methods/${id}`),
  getPaymentHistory: (params) => api.get('/payments/history', { params }),
}

export const userService = {
  getUserProfile: () => api.get('/users/profile'),
  updateUserProfile: (data) => api.put('/users/profile', data),
  updatePassword: (data) => api.put('/users/password', data),
}