import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import Header from '../components/navigation/Header'
import MobileNav from '../components/navigation/MobileNav'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/common/Loading'

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { loading } = useAuth()
  const location = useLocation()

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-dark-400 flex">
      {/* Sidebar for desktop */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto pb-16 pt-4 px-4 sm:px-6 md:px-8">
          <Outlet />
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  )
}

export default AppLayout