import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/common/Loading'
import Logo from '../components/common/Logo'

const AuthLayout = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <Loading />
  }
  
  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to={user.role === 'rider' ? '/dashboard' : '/driver/dashboard'} replace />
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-400">
      <div className="absolute top-6 left-6 z-10">
        <Logo />
      </div>
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left side - Auth form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md space-y-8">
            <Outlet />
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 bg-dark-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-dark-900/90 z-10"></div>
          <img
            src="https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg"
            alt="Ride-sharing"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20 p-10">
            <div className="text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Travel Together, Save Together</h2>
              <p className="text-lg opacity-90">
                Join our community of riders and drivers to make travel more affordable, 
                efficient, and environmentally friendly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout