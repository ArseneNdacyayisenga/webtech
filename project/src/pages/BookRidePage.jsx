/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Map, { Marker } from 'react-map-gl'
import { toast } from 'react-toastify'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  CreditCardIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline'

const BookRidePage = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 12,
    bearing: 0,
    pitch: 0
  })
  
  const [pickup, setPickup] = useState({
    address: '',
    coordinates: null
  })
  
  const [dropoff, setDropoff] = useState({
    address: '',
    coordinates: null
  })
  
  const [rideOptions, setRideOptions] = useState({
    type: 'standard', // standard, comfort, xl
    passengers: 1,
    scheduledTime: null,
  })
  
  const [estimatedPrice, setEstimatedPrice] = useState(null)
  const [estimatedTime, setEstimatedTime] = useState(null)
  const [isBooking, setIsBooking] = useState(false)
  const [step, setStep] = useState(1)
  
  const mapRef = useRef(null)
  
  // Mock locations for autocomplete
  const suggestedLocations = [
    { address: 'Home - 123 Main St, New York, NY', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
    { address: 'Work - 350 5th Ave, New York, NY', coordinates: { latitude: 40.7484, longitude: -73.9857 } },
    { address: 'Grand Central Terminal, New York, NY', coordinates: { latitude: 40.7527, longitude: -73.9772 } },
    { address: 'Times Square, New York, NY', coordinates: { latitude: 40.7580, longitude: -73.9855 } },
    { address: 'Central Park, New York, NY', coordinates: { latitude: 40.7812, longitude: -73.9665 } },
  ]
  
  useEffect(() => {
    // Calculate estimated price and time when both pickup and dropoff are set
    if (pickup.coordinates && dropoff.coordinates) {
      calculateEstimates()
    }
  }, [pickup, dropoff, rideOptions])
  
  const calculateEstimates = () => {
    // In a real app, this would call an API to get estimates
    // Here we'll just calculate based on distance
    
    // Calculate distance (haversine formula)
    const R = 6371e3 // Earth radius in meters
    const φ1 = pickup.coordinates.latitude * Math.PI/180
    const φ2 = dropoff.coordinates.latitude * Math.PI/180
    const Δφ = (dropoff.coordinates.latitude - pickup.coordinates.latitude) * Math.PI/180
    const Δλ = (dropoff.coordinates.longitude - pickup.coordinates.longitude) * Math.PI/180
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    const distance = R * c // in meters
    const distanceMiles = distance / 1609.34 // convert to miles
    
    // Calculate estimated time (average speed 25 mph)
    const timeMinutes = Math.round(distanceMiles * (60 / 25))
    
    // Calculate estimated price
    let baseFare = 2.5
    let perMile = 1.75
    let perMinute = 0.35
    
    if (rideOptions.type === 'comfort') {
      baseFare = 5
      perMile = 2.25
      perMinute = 0.45
    } else if (rideOptions.type === 'xl') {
      baseFare = 7.5
      perMile = 3
      perMinute = 0.55
    }
    
    const estimatedFare = baseFare + (distanceMiles * perMile) + (timeMinutes * perMinute)
    
    setEstimatedPrice(estimatedFare.toFixed(2))
    setEstimatedTime(timeMinutes)
    
    // Update map viewport to show both markers
    if (mapRef.current) {
      const bounds = new mapboxgl.LngLatBounds()
      bounds.extend([pickup.coordinates.longitude, pickup.coordinates.latitude])
      bounds.extend([dropoff.coordinates.longitude, dropoff.coordinates.latitude])
      
      mapRef.current.fitBounds(bounds, {
        padding: 100,
        duration: 1000
      })
    }
  }
  
  const handleSelectLocation = (location, type) => {
    if (type === 'pickup') {
      setPickup(location)
    } else {
      setDropoff(location)
    }
  }
  
  const swapLocations = () => {
    const temp = pickup
    setPickup(dropoff)
    setDropoff(temp)
  }
  
  const handleBookRide = () => {
    setIsBooking(true)
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      toast.success('Your ride has been booked successfully!')
      // Reset form or redirect to confirmation page
    }, 2000)
  }
  
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-2/3"
        >
          <div className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
            <Map
              ref={mapRef}
              initialViewState={viewport}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxAccessToken="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA"
            >
              {pickup.coordinates && (
                <Marker
                  longitude={pickup.coordinates.longitude}
                  latitude={pickup.coordinates.latitude}
                  anchor="bottom"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                    <div className="px-2 py-1 bg-dark-300 rounded text-xs text-white mt-1">
                      Pickup
                    </div>
                  </div>
                </Marker>
              )}
              
              {dropoff.coordinates && (
                <Marker
                  longitude={dropoff.coordinates.longitude}
                  latitude={dropoff.coordinates.latitude}
                  anchor="bottom"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-accent-500 rounded-full"></div>
                    <div className="px-2 py-1 bg-dark-300 rounded text-xs text-white mt-1">
                      Dropoff
                    </div>
                  </div>
                </Marker>
              )}
            </Map>
          </div>
        </motion.div>
        
        {/* Booking form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full lg:w-1/3"
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-white mb-6">Book a Ride</h2>
            
            {step === 1 && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    label="Pickup Location"
                    placeholder="Enter pickup location"
                    value={pickup.address}
                    onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
                    icon={<MapPinIcon className="h-5 w-5" />}
                  />
                  
                  {pickup.address && (
                    <div className="absolute z-10 mt-1 w-full bg-dark-300 rounded-lg border border-dark-100 shadow-lg">
                      {suggestedLocations
                        .filter(loc => loc.address.toLowerCase().includes(pickup.address.toLowerCase()))
                        .map((location, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-dark-200 cursor-pointer"
                            onClick={() => handleSelectLocation(location, 'pickup')}
                          >
                            <p className="text-sm text-white">{location.address}</p>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center my-2">
                  <button 
                    className="p-2 bg-dark-300 rounded-full hover:bg-dark-200 transition-colors"
                    onClick={swapLocations}
                  >
                    <ArrowsRightLeftIcon className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    label="Dropoff Location"
                    placeholder="Enter dropoff location"
                    value={dropoff.address}
                    onChange={(e) => setDropoff({ ...dropoff, address: e.target.value })}
                    icon={<MapPinIcon className="h-5 w-5" />}
                  />
                  
                  {dropoff.address && (
                    <div className="absolute z-10 mt-1 w-full bg-dark-300 rounded-lg border border-dark-100 shadow-lg">
                      {suggestedLocations
                        .filter(loc => loc.address.toLowerCase().includes(dropoff.address.toLowerCase()))
                        .map((location, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-dark-200 cursor-pointer"
                            onClick={() => handleSelectLocation(location, 'dropoff')}
                          >
                            <p className="text-sm text-white">{location.address}</p>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button
                    fullWidth
                    disabled={!pickup.coordinates || !dropoff.coordinates}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select Ride Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['standard', 'comfort', 'xl'].map((type) => (
                      <div
                        key={type}
                        className={`
                          p-3 rounded-lg border cursor-pointer text-center
                          ${rideOptions.type === type 
                            ? 'border-primary-500 bg-primary-900/20' 
                            : 'border-dark-100 hover:bg-dark-300'
                          }
                        `}
                        onClick={() => setRideOptions({ ...rideOptions, type })}
                      >
                        <div className="flex flex-col items-center">
                          <svg className="h-6 w-6 mb-1 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M8 7h8m-8 5h8m-4 5h4M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" 
                            />
                          </svg>
                          <span className="text-sm capitalize text-white">
                            {type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Passengers
                  </label>
                  <div className="flex border border-dark-100 rounded-lg overflow-hidden">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className={`
                          flex-1 py-2 text-center 
                          ${rideOptions.passengers === num 
                            ? 'bg-primary-600 text-white' 
                            : 'text-gray-300 hover:bg-dark-300'
                          }
                        `}
                        onClick={() => setRideOptions({ ...rideOptions, passengers: num })}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    Schedule for Later?
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="scheduleToggle"
                      className="h-4 w-4 rounded border-gray-600 bg-dark-400 text-primary-600 focus:ring-primary-500"
                      onChange={(e) => {
                        if (!e.target.checked) {
                          setRideOptions({ ...rideOptions, scheduledTime: null })
                        }
                      }}
                    />
                    <label htmlFor="scheduleToggle" className="text-sm text-gray-300">
                      Schedule this ride
                    </label>
                  </div>
                  
                  {/* Show date/time picker if scheduling */}
                  <div className="mt-2">
                    <input
                      type="datetime-local"
                      className="bg-dark-300 border border-dark-100 rounded-lg px-4 py-2 text-white w-full"
                      onChange={(e) => setRideOptions({ ...rideOptions, scheduledTime: e.target.value })}
                      disabled={!document.getElementById('scheduleToggle')?.checked}
                    />
                  </div>
                </div>
                
                {estimatedPrice && estimatedTime && (
                  <div className="mt-6 bg-dark-300 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Estimated fare</span>
                      <span className="text-white font-medium">${estimatedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated time</span>
                      <span className="text-white font-medium">{estimatedTime} min</span>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="accent"
                    isLoading={isBooking}
                    onClick={handleBookRide}
                  >
                    Book Ride
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Payment methods */}
          <div className="mt-4 card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-white">Payment Method</h3>
              <button className="text-primary-500 text-sm hover:text-primary-400">
                Change
              </button>
            </div>
            
            <div className="flex items-center bg-dark-300 p-3 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-gray-400 mr-3" />
              <div>
                <p className="text-white">•••• 4242</p>
                <p className="text-xs text-gray-400">Expires 12/25</p>
              </div>
            </div>
          </div>
          
          {/* Saved locations */}
          <div className="mt-4 card">
            <h3 className="font-medium text-white mb-4">Saved Locations</h3>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-dark-300 rounded-lg cursor-pointer hover:bg-dark-200">
                <div className="p-2 bg-primary-900/50 rounded-full mr-3">
                  <MapPinIcon className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-white">Home</p>
                  <p className="text-xs text-gray-400">123 Main St, New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-dark-300 rounded-lg cursor-pointer hover:bg-dark-200">
                <div className="p-2 bg-secondary-900/50 rounded-full mr-3">
                  <svg className="h-5 w-5 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white">Work</p>
                  <p className="text-xs text-gray-400">350 5th Ave, New York, NY</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BookRidePage