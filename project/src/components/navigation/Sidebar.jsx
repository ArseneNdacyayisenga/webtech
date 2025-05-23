import { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Logo from '../common/Logo'
import {
  HomeIcon,
  MapIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const Sidebar = ({ open, setOpen }) => {
  const { user, logout } = useAuth()
  const sidebarRef = useRef(null)
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen])
  
  // Navigation links based on user role
  const navigationLinks = user?.role === 'rider'
    ? [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Book a Ride', href: '/book-ride', icon: MapIcon },
        { name: 'Ride History', href: '/ride-history', icon: ClockIcon },
        { name: 'Payment', href: '/payment', icon: CreditCardIcon },
        { name: 'Profile', href: '/profile', icon: UserIcon },
      ]
    : [
        { name: 'Dashboard', href: '/driver/dashboard', icon: HomeIcon },
        { name: 'Ride History', href: '/ride-history', icon: ClockIcon },
        { name: 'Payment', href: '/payment', icon: CreditCardIcon },
        { name: 'Profile', href: '/profile', icon: UserIcon },
      ]
  
  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-dark-300 transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:z-0
          ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-dark-100">
            <Logo />
            <button
              className="p-1 rounded-md text-gray-400 hover:text-white lg:hidden"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => `
                  flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors
                  ${isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-dark-200'
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          {/* User profile */}
          <div className="p-4 border-t border-dark-100">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt={user?.name || 'User'}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            
            {/* Logout button */}
            <button
              onClick={logout}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-dark-200 rounded-lg hover:bg-dark-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar