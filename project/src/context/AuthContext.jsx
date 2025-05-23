import { createContext, useState, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [twoFactorPending, setTwoFactorPending] = useState(false)
  const [tempEmail, setTempEmail] = useState('')

  // Check if user is already logged in
  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true)
      // In a real app, we would validate the JWT token with the backend
      const token = localStorage.getItem('auth_token')
      
      if (token) {
        // Mock user data for demo purposes
        // In a real app, we would make an API call to get the user data
        const userData = JSON.parse(localStorage.getItem('user_data'))
        if (userData) {
          setUser(userData)
        } else {
          localStorage.removeItem('auth_token')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    } finally {
      setLoading(false)
    }
  }, [])

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true)
      
      // Mock API call for demo purposes
      // In a real app, we would make an actual API call
      // const response = await api.post('/auth/login', { email, password })
      
      // Simulate 2FA requirement
      if (email === 'rider@example.com' || email === 'driver@example.com') {
        setTwoFactorPending(true)
        setTempEmail(email)
        return { success: true, requires2FA: true }
      }
      
      // Simulate successful login for demo
      const mockUser = {
        id: 1,
        email: email,
        name: email === 'rider@example.com' ? 'John Rider' : 'Dave Driver',
        role: email === 'rider@example.com' ? 'rider' : 'driver',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      }
      
      // Save auth data
      localStorage.setItem('auth_token', 'mock_jwt_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      setUser(mockUser)
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Login failed. Please check your credentials.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Complete 2FA verification
  const verify2FA = useCallback(async (code) => {
    try {
      setLoading(true)
      
      // Mock API call for demo purposes
      // In a real app, we would make an actual API call to verify the code
      // const response = await api.post('/auth/verify-2fa', { email: tempEmail, code })
      
      // Simulate successful verification
      if (code === '123456') {
        const mockUser = {
          id: 1,
          email: tempEmail,
          name: tempEmail === 'rider@example.com' ? 'John Rider' : 'Dave Driver',
          role: tempEmail === 'rider@example.com' ? 'rider' : 'driver',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
        
        // Save auth data
        localStorage.setItem('auth_token', 'mock_jwt_token')
        localStorage.setItem('user_data', JSON.stringify(mockUser))
        
        setUser(mockUser)
        setTwoFactorPending(false)
        setTempEmail('')
        return { success: true }
      } else {
        toast.error('Invalid verification code')
        return { success: false, error: 'Invalid verification code' }
      }
    } catch (error) {
      console.error('2FA verification failed:', error)
      toast.error('Verification failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [tempEmail])

  // Sign up function
  const signup = useCallback(async (userData) => {
    try {
      setLoading(true)
      
      // Mock API call for demo purposes
      // In a real app, we would make an actual API call
      // const response = await api.post('/auth/signup', userData)
      
      toast.success('Account created successfully! You can now log in.')
      return { success: true }
    } catch (error) {
      console.error('Signup failed:', error)
      toast.error('Signup failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Request password reset
  const requestPasswordReset = useCallback(async (email) => {
    try {
      setLoading(true)
      
      // Mock API call for demo purposes
      // In a real app, we would make an actual API call
      // const response = await api.post('/auth/forgot-password', { email })
      
      toast.success('Password reset link sent to your email!')
      return { success: true }
    } catch (error) {
      console.error('Password reset request failed:', error)
      toast.error('Failed to send reset link. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Reset password
  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      setLoading(true)
      
      // Mock API call for demo purposes
      // In a real app, we would make an actual API call
      // const response = await api.post('/auth/reset-password', { token, newPassword })
      
      toast.success('Password reset successfully! You can now log in with your new password.')
      return { success: true }
    } catch (error) {
      console.error('Password reset failed:', error)
      toast.error('Password reset failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Google login
  const googleLogin = useCallback(async () => {
    try {
      setLoading(true)
      
      // In a real app, we would implement Google OAuth flow
      // For demo purposes, we'll just mock a successful login
      
      toast.success('Successfully logged in with Google!')
      
      const mockUser = {
        id: 2,
        email: 'user@gmail.com',
        name: 'Google User',
        role: 'rider',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      }
      
      // Save auth data
      localStorage.setItem('auth_token', 'mock_jwt_token')
      localStorage.setItem('user_data', JSON.stringify(mockUser))
      
      setUser(mockUser)
      return { success: true }
    } catch (error) {
      console.error('Google login failed:', error)
      toast.error('Google login failed. Please try again.')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
    setUser(null)
    toast.success('Successfully logged out')
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      loading,
      twoFactorPending,
      tempEmail,
      login,
      verify2FA,
      signup,
      requestPasswordReset,
      resetPassword,
      googleLogin,
      logout,
      checkAuthStatus,
    }),
    [
      user,
      loading,
      twoFactorPending,
      tempEmail,
      login,
      verify2FA,
      signup,
      requestPasswordReset,
      resetPassword,
      googleLogin,
      logout,
      checkAuthStatus,
    ]
  )

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}