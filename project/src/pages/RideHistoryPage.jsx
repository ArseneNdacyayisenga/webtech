import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useAuth } from '../hooks/useAuth'
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const RideHistoryPage = () => {
  const { user } = useAuth()
  const [rides, setRides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    searchQuery: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRide, setSelectedRide] = useState(null)
  
  useEffect(() => {
    fetchRides()
  }, [filters, currentPage])
  
  const fetchRides = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call with filters and pagination
      // For demo purposes, we'll simulate with mock data
      setTimeout(() => {
        const mockRides = []
        
        // Generate 20 rides
        for (let i = 1; i <= 50; i++) {
          // Create a random date within the last 3 months
          const date = new Date()
          date.setDate(date.getDate() - Math.floor(Math.random() * 90))
          
          const statuses = ['completed', 'cancelled', 'in_progress']
          const status = statuses[Math.floor(Math.random() * statuses.length)]
          
          const ride = {
            id: i,
            date: date.toISOString(),
            pickup: ['123 Main St', '456 Market St', 'Grand Central Terminal', 'Central Park', 'Times Square'][Math.floor(Math.random() * 5)],
            dropoff: ['789 Broadway', '101 Pine St', 'JFK Airport', 'Brooklyn Bridge', 'Statue of Liberty'][Math.floor(Math.random() * 5)],
            price: parseFloat((Math.random() * 50 + 10).toFixed(2)),
            distance: parseFloat((Math.random() * 10 + 1).toFixed(1)),
            duration: Math.floor(Math.random() * 45 + 5),
            status,
            rating: status === 'completed' ? parseFloat((Math.random() * 2 + 3).toFixed(1)) : null,
            driver: {
              name: ['Michael Chen', 'Sarah Johnson', 'Robert Williams', 'Emma Davis', 'James Wilson'][Math.floor(Math.random() * 5)],
              rating: parseFloat((Math.random() * 1 + 4).toFixed(1)),
              avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
            },
          }
          
          mockRides.push(ride)
        }
        
        // Filter rides based on current filters
        let filteredRides = [...mockRides]
        
        if (filters.status !== 'all') {
          filteredRides = filteredRides.filter(ride => ride.status === filters.status)
        }
        
        if (filters.dateRange !== 'all') {
          const today = new Date()
          const cutoffDate = new Date()
          
          switch (filters.dateRange) {
            case 'week':
              cutoffDate.setDate(today.getDate() - 7)
              break
            case 'month':
              cutoffDate.setMonth(today.getMonth() - 1)
              break
            case 'year':
              cutoffDate.setFullYear(today.getFullYear() - 1)
              break
            default:
              break
          }
          
          filteredRides = filteredRides.filter(ride => new Date(ride.date) >= cutoffDate)
        }
        
        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase()
          filteredRides = filteredRides.filter(ride => 
            ride.pickup.toLowerCase().includes(query) ||
            ride.dropoff.toLowerCase().includes(query) ||
            ride.driver.name.toLowerCase().includes(query)
          )
        }
        
        // Sort by date (newest first)
        filteredRides.sort((a, b) => new Date(b.date) - new Date(a.date))
        
        // Paginate
        const itemsPerPage = 10
        const totalItems = filteredRides.length
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage)
        
        setTotalPages(calculatedTotalPages)
        
        // Adjust current page if it's out of bounds
        const adjustedCurrentPage = Math.min(currentPage, calculatedTotalPages || 1)
        if (adjustedCurrentPage !== currentPage) {
          setCurrentPage(adjustedCurrentPage)
        }
        
        // Get rides for current page
        const startIndex = (adjustedCurrentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedRides = filteredRides.slice(startIndex, endIndex)
        
        setRides(paginatedRides)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching rides:', error)
      setIsLoading(false)
    }
  }
  
  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
    setCurrentPage(1) // Reset to first page when changing filters
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    // The search is already triggered by the useEffect when filters change
  }
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }
  
  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Ride History</h1>
        
        <button className="flex items-center text-sm text-white bg-dark-300 px-4 py-2 rounded-lg hover:bg-dark-200">
          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="py-2.5 pl-10 pr-3 bg-dark-300 border border-dark-100 rounded-lg text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Search locations, drivers..."
                />
              </div>
            </form>
          </div>
          
          {/* Filters */}
          <div className="flex gap-3">
            <div>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="py-2.5 px-4 bg-dark-300 border border-dark-100 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="in_progress">In Progress</option>
              </select>
            </div>
            
            <div>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="py-2.5 px-4 bg-dark-300 border border-dark-100 rounded-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            
            <button className="p-2.5 bg-dark-300 border border-dark-100 rounded-lg text-white hover:bg-dark-200">
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : rides.length === 0 ? (
        <div className="bg-dark-300 rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-dark-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No rides found</h3>
          <p className="text-gray-400">Try adjusting your filters or search query</p>
        </div>
      ) : selectedRide ? (
        // Ride detail view
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-300 rounded-lg overflow-hidden"
        >
          <div className="p-6 border-b border-dark-100">
            <button 
              onClick={() => setSelectedRide(null)}
              className="flex items-center text-primary-500 hover:text-primary-400 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back to all rides
            </button>
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Ride Details</h2>
              <span className={`
                px-3 py-1 text-xs font-medium rounded-full
                ${selectedRide.status === 'completed' ? 'bg-success-100 text-success-800' : 
                  selectedRide.status === 'cancelled' ? 'bg-danger-100 text-danger-800' :
                  'bg-primary-100 text-primary-800'}
              `}>
                {selectedRide.status === 'in_progress' ? 'In Progress' : 
                  selectedRide.status.charAt(0).toUpperCase() + selectedRide.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Ride Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Date & Time</p>
                    <p className="text-white">{formatDate(selectedRide.date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Pickup Location</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                      <p className="text-white">{selectedRide.pickup}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-400">Dropoff Location</p>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-accent-500 mr-2"></div>
                      <p className="text-white">{selectedRide.dropoff}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Distance</p>
                      <p className="text-white">{selectedRide.distance} mi</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Duration</p>
                      <p className="text-white">{selectedRide.duration} min</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-white font-medium">${selectedRide.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Driver Information</h3>
                
                <div className="flex items-center mb-4">
                  <img 
                    src={selectedRide.driver.avatar}
                    alt={selectedRide.driver.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{selectedRide.driver.name}</p>
                    <div className="flex items-center mt-1">
                      <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-gray-300">{selectedRide.driver.rating}</span>
                    </div>
                  </div>
                </div>
                
                {selectedRide.status === 'completed' && (
                  <div className="bg-dark-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-2">Your Rating</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star}
                          className={`w-6 h-6 ${star <= selectedRide.rating ? 'text-yellow-500' : 'text-gray-600'}`}
                        />
                      ))}
                      <span className="ml-2 text-white">{selectedRide.rating}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="text-white font-medium mb-2">Payment</h4>
                  <div className="bg-dark-200 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Base fare</span>
                      <span className="text-white">${(selectedRide.price * 0.6).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Distance fee</span>
                      <span className="text-white">${(selectedRide.price * 0.3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Service fee</span>
                      <span className="text-white">${(selectedRide.price * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-dark-100 my-2 pt-2 flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-white font-medium">${selectedRide.price}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Paid with •••• 4242
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        // Ride list view
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-100">
              <thead className="bg-dark-300">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    From / To
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Driver
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-dark-200 divide-y divide-dark-100">
                {rides.map((ride) => (
                  <motion.tr
                    key={ride.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-dark-300 cursor-pointer"
                    onClick={() => setSelectedRide(ride)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{format(new Date(ride.date), 'MMM d, yyyy')}</div>
                      <div className="text-xs text-gray-400">{format(new Date(ride.date), 'h:mm a')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex flex-col items-center mr-3">
                          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                          <div className="w-0.5 h-6 bg-dark-100"></div>
                          <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                        </div>
                        <div>
                          <div className="text-sm text-white">{ride.pickup}</div>
                          <div className="text-sm text-white">{ride.dropoff}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={ride.driver.avatar}
                          alt={ride.driver.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sm text-white">{ride.driver.name}</div>
                          <div className="flex items-center">
                            <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-gray-400">{ride.driver.rating}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">${ride.price}</div>
                      <div className="text-xs text-gray-400">{ride.distance} mi • {ride.duration} min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${ride.status === 'completed' ? 'bg-success-100 text-success-800' : 
                          ride.status === 'cancelled' ? 'bg-danger-100 text-danger-800' :
                          'bg-primary-100 text-primary-800'}
                      `}>
                        {ride.status === 'in_progress' ? 'In Progress' : 
                          ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-400">
              Showing {rides.length} of {totalPages * 10} rides
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1 
                    ? 'text-gray-600 cursor-not-allowed' 
                    : 'text-gray-400 hover:bg-dark-200'
                }`}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page + 1
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:bg-dark-200'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:bg-dark-200'
                }`}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RideHistoryPage