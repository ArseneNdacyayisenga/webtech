import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Loading from './components/common/Loading'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'

// Lazy load components for better performance
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const SignupPage = lazy(() => import('./pages/auth/SignupPage'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const TwoFactorAuthPage = lazy(() => import('./pages/auth/TwoFactorAuthPage'))
const RiderDashboardPage = lazy(() => import('./pages/dashboard/RiderDashboardPage'))
const DriverDashboardPage = lazy(() => import('./pages/dashboard/DriverDashboardPage'))
const BookRidePage = lazy(() => import('./pages/BookRidePage'))
const RideHistoryPage = lazy(() => import('./pages/RideHistoryPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Route guard components
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <Loading />
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <Loading />
  
  if (!user || user.role !== 'rider') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const DriverRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <Loading />
  
  if (!user || user.role !== 'driver') {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function App() {
  const { user, checkAuthStatus } = useAuth()
  
  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/two-factor-auth" element={<TwoFactorAuthPage />} />
        </Route>
        
        {/* App Routes */}
        <Route element={<AppLayout />}>
          {/* Redirect based on user role */}
          <Route path="/" element={
            user ? (
              user.role === 'rider' ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/driver/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Rider Routes */}
          <Route path="/dashboard" element={
            <RiderRoute>
              <RiderDashboardPage />
            </RiderRoute>
          } />
          <Route path="/book-ride" element={
            <RiderRoute>
              <BookRidePage />
            </RiderRoute>
          } />
          
          {/* Driver Routes */}
          <Route path="/driver/dashboard" element={
            <DriverRoute>
              <DriverDashboardPage />
            </DriverRoute>
          } />
          
          {/* Common Routes */}
          <Route path="/ride-history" element={
            <ProtectedRoute>
              <RideHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App