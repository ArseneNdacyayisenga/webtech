import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import { 
  ClockIcon, 
  BanknotesIcon, 
  TruckIcon, 
  StarIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const DriverDashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [upcomingRides, setUpcomingRides] = useState([])
  const [activeRide, setActiveRide] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOnline, setIsOnline] = useState(true)
  
  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // Simulate API call with setTimeout
        setTimeout(() => {
          setStats({
            totalRides: 142,
            totalEarnings: 2840.75,
            totalDistance: 1243.8,
            rating: 4.92,
          })
          
          setUpcomingRides([
            {
              id: 1,
              date: '2023-11-06T15:30:00',
              pickup: '123 Main St',
              dropoff: '456 Market St',
              price: 23.50,
              distance: 3.4,
              duration: 15,
              rider: {
                name: 'Emma Wilson',
                rating: 4.8,
                avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
              },
            },
            {
              id: 2,
              date: '2023-11-06T17:15:00',
              pickup: '789 Park Ave',
              dropoff: '101 Business Center',
              price: 18.75,
              distance: 2.8,
              duration: 12,
              rider: {
                name: 'Tom Miller',
                rating: 4.9,
                avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
              },
            },
          ])
          
          setActiveRide({
            id: 3,
            date: '2023-11-05T14:00:00',
            pickup: 'Grand Central Station',
            dropoff: '221B Baker St',
            price: 32.20,
            distance: 4.7,
            duration: 22,
            status: 'in_progress',
            rider: {
              name: 'Jessica Brown',
              rating: 4.7,
              avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
              phone: '+1 (555) 123-4567',
            },
          })
          
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
      {/* Online status */}
      <section className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-2xl p-6 sm:p-8 ${isOnline ? 'bg-gradient-to-r from-success-900 to-success-800' : 'bg-gradient-to-r from-dark-300 to-dark-200'}`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {isOnline ? 'You are online' : 'You are offline'}
              </h1>
              <p className={`mt-2 ${isOnline ? 'text-success-200' : 'text-gray-400'}`}>
                {isOnline ? 'You\'re visible to riders' : 'Go online to start receiving ride requests'}
              </p>
            </div>
            
            <Button 
              variant={isOnline ? 'danger' : 'success'} 
              size="lg"
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </motion.div>
      </section>
      
      {/* Active Ride */}
      {activeRide && isOnline && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Current Ride</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card border-2 border-primary-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <img 
                  src={activeRide.rider.avatar} 
                  alt={activeRide.rider.name}
                  className="w-12 h-12 rounded-full mr-3" 
                />
                <div>
                  <h4 className="font-medium text-white">{activeRide.rider.name}</h4>
                  <div className="flex items-center text-sm">
                    <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-300">{activeRide.rider.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-white">${activeRide.price}</span>
                <p className="text-sm text-gray-400">{activeRide.distance} mi • {activeRide.duration} min</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-start mb-2">
                <div className="flex flex-col items-center mr-3">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <div className="w-0.5 h-16 bg-dark-100"></div>
                  <div className="w-3 h-3 rounded-full bg-accent-500"></div>
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="text-xs text-gray-400">PICKUP</p>
                    <p className="text-sm text-white">{activeRide.pickup}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(activeRide.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">DROPOFF</p>
                    <p className="text-sm text-white">{activeRide.dropoff}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Button
                variant="outline"
                fullWidth
                icon={<PhoneIcon className="w-5 h-5" />}
              >
                Call Rider
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                icon={<MapPinIcon className="w-5 h-5" />}
              >
                Navigation
              </Button>
              
              <Button
                variant="accent"
                fullWidth
              >
                Complete Ride
              </Button>
            </div>
          </motion.div>
        </section>
      )}
      
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
              <div className="p-3 rounded-lg bg-success-900/50 mr-4">
                <BanknotesIcon className="w-6 h-6 text-success-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Earnings</p>
                <h3 className="text-2xl font-bold text-white">${stats?.totalEarnings}</h3>
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
              <div className="p-3 rounded-lg bg-secondary-900/50 mr-4">
                <TruckIcon className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Distance (mi)</p>
                <h3 className="text-2xl font-bold text-white">{stats?.totalDistance}</h3>
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
                <p className="text-gray-400 text-sm">Rating</p>
                <h3 className="text-2xl font-bold text-white">{stats?.rating}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Upcoming Rides */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Upcoming Rides</h2>
          <Link to="/ride-history" className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center">
            View all
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        {upcomingRides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingRides.map((ride) => (
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
                      src={ride.rider.avatar} 
                      alt={ride.rider.name}
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div>
                      <h4 className="font-medium text-white">{ride.rider.name}</h4>
                      <div className="flex items-center text-sm">
                        <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-gray-300">{ride.rider.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-white">${ride.price}</span>
                    <p className="text-sm text-gray-400">{ride.distance} mi • {ride.duration} min</p>
                  </div>
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
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{formatDate(ride.date)}</span>
                  <Button variant="primary" size="sm">
                    Accept
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center">
            <p className="text-gray-400">No upcoming rides scheduled</p>
            {!isOnline && (
              <p className="mt-2 text-sm text-gray-500">
                Go online to start receiving ride requests
              </p>
            )}
          </div>
        )}
      </section>
      
      {/* Weekly Earnings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Weekly Earnings</h2>
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">This Week</h3>
            <span className="text-xl font-semibold text-white">$342.50</span>
          </div>
          
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const height = [30, 45, 25, 60, 40, 80, 20][index]
              return (
                <div key={day} className="flex items-center">
                  <span className="w-10 text-sm text-gray-400">{day}</span>
                  <div className="flex-1 ml-2">
                    <div className="h-4 bg-dark-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${height}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-primary-600 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                  <span className="ml-2 text-sm text-gray-300">${(height * 1.5).toFixed(2)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default DriverDashboardPage