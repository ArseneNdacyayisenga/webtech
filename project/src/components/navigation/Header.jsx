import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    e.preventDefault()
    // Implement global search functionality
    console.log('Searching for:', searchQuery)
  }
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'New ride request',
      message: 'You have a new ride request from Downtown to Airport',
      time: '5 min ago',
      read: false,
    },
    {
      id: 2,
      title: 'Payment received',
      message: 'You received a payment of $24.50',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      title: 'Ride completed',
      message: 'Your ride with John has been completed',
      time: '3 hours ago',
      read: true,
    },
  ]
  
  return (
    <header className="sticky top-0 z-30 bg-dark-300 border-b border-dark-100">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left: Menu button & search */}
        <div className="flex items-center flex-1">
          <button
            className="text-gray-400 hover:text-white lg:hidden mr-3"
            onClick={toggleSidebar}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          
          <form className="hidden sm:flex sm:max-w-md" onSubmit={handleSearch}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 pr-3 bg-dark-400 border border-dark-100 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        
        {/* Right: Notifications & profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-1 text-gray-400 hover:text-white rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <BellIcon className="w-6 h-6" />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger-500 ring-2 ring-dark-300"></span>
              )}
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-dark-200 rounded-lg shadow-lg py-1 z-50 border border-dark-100">
                <div className="px-4 py-2 border-b border-dark-100">
                  <h3 className="text-sm font-medium text-white">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-dark-300 cursor-pointer ${!notification.read ? 'bg-dark-300/50' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-white">{notification.title}</p>
                          <span className="text-xs text-gray-400">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-1">{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-gray-400">No notifications</p>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-dark-100">
                  <button className="text-xs text-primary-500 hover:text-primary-400 w-full text-center">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User profile */}
          <div className="relative">
            <button 
              className="flex items-center"
              onClick={() => navigate('/profile')}
            >
              <img
                src={user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt={user?.name || 'User'}
                className="h-9 w-9 rounded-full object-cover border-2 border-dark-100"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header