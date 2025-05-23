import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import { 
  ClockIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  StarIcon,
  ArrowRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'

const RiderDashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentRides, setRecentRides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // Simulate API call with setTimeout
        setTimeout(() => {
          setStats({
            totalRides: 24,
            savedMoney: 345.50,
            carbonSaved: 127.8,
            favoriteLocations: [
              'Home',
              'Work',
              'Gym',
              'Airport',
            ],
          })
          
          setRecentRides([
            {
              id: 1,
              date: '2023-11-05T14:30:00',
              pickup: '123 Main St',
              dropoff: '456 Market St',
              price: 23.50,
              status: 'completed',
              driver: {
                name: 'Michael Chen',
                rating: 4.8,
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              },
            },
            {
              id: 2,
              date: '2023-11-01T09:15:00',
              pickup: '789 Park Ave',
              dropoff: '101 Business Center',
              price: 18.75,
              status: 'completed',
              driver: {
                name: 'Sarah Johnson',
                rating: 4.9,
                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              },
            },
            {
              id: 3,
              date: '2023-10-28T19:45:00',
              pickup: 'Grand Central Station',
              dropoff: '221B Baker St',
              price: 32.20,
              status: 'completed',
              driver: {
                name: 'Robert Williams',
                rating: 4.7,
                avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
              },
            },
          ])
          
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setIsLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])
  
  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ArrowPathIcon className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="container">
      {/* Welcome section */}
      <section className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-2xl p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {user?.name.split(' ')[0] || 'Rider'}
              </h1>
              <p className="mt-2 text-primary-200">
                Ready for your next ride?
              </p>
            </div>
            
            <Link to="/book-ride">
              <Button variant="accent" size="lg">
                Book a Ride
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      
      {/* Stats */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Your Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="card hover-card"
          >
            <div className="flex items-start">
              <div className="p-3 rounded-lg bg-primary-900/50 mr-4">
                <ClockIcon className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Rides</p>
                <h3 className="text-2xl font-bold text-white">{stats?.totalRides}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="card hover-card"
          >
            <div className="flex items-start">
              <div className="p-3 rounded-lg bg-secondary-900/50 mr-4">
                <CreditCardIcon className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Money Saved</p>
                <h3 className="text-2xl font-bold text-white">${stats?.savedMoney}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="card hover-card"
          >
            <div className="flex items-start">
              <div className="p-3 rounded-lg bg-success-900/50 mr-4">
                <svg className="w-6 h-6 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-gray-400 text-sm">CO₂ Saved (kg)</p>
                <h3 className="text-2xl font-bold text-white">{stats?.carbonSaved}</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="card hover-card"
          >
            <div className="flex items-start">
              <div className="p-3 rounded-lg bg-accent-900/50 mr-4">
                <StarIcon className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg. Rating</p>
                <h3 className="text-2xl font-bold text-white">4.9</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Recent Rides */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Rides</h2>
          <Link to="/ride-history" className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
            View all
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentRides.map((ride) => (
            <motion.div 
              key={ride.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * ride.id }}
              className="card hover-card"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img 
                    src={ride.driver.avatar} 
                    alt={ride.driver.name}
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <h4 className="font-medium text-white">{ride.driver.name}</h4>
                    <div className="flex items-center text-sm">
                      <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-gray-300">{ride.driver.rating}</span>
                    </div>
                  </div>
                </div>
                <span className="text-lg font-semibold text-white">${ride.price}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-start mb-2">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <div className="w-0.5 h-8 bg-dark-100"></div>
                    <div className="w-3 h-3 rounded-full bg-accent-500"></div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <p className="text-xs text-gray-400">PICKUP</p>
                      <p className="text-sm text-white truncate">{ride.pickup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">DROPOFF</p>
                      <p className="text-sm text-white truncate">{ride.dropoff}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{formatDate(ride.date)}</span>
                <span className="px-2 py-1 rounded-full bg-dark-300 text-green-400 text-xs font-medium">
                  Completed
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Favorite Locations */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Favorite Locations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats?.favoriteLocations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="card hover-card cursor-pointer"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-dark-300 mb-3">
                  <MapPinIcon className="w-6 h-6 text-primary-500" />
                </div>
                <h4 className="font-medium text-white">{location}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default RiderDashboardPage