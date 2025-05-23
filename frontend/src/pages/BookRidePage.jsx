// First, let's update the mock locations to use Kigali locations
const suggestedLocations = [
  { 
    address: 'Kigali International Airport', 
    coordinates: { latitude: -1.9706, longitude: 30.1346 } 
  },
  { 
    address: 'Kigali Convention Centre', 
    coordinates: { latitude: -1.9539, longitude: 30.0939 } 
  },
  { 
    address: 'Nyabugogo Bus Station', 
    coordinates: { latitude: -1.9397, longitude: 30.0562 } 
  },
  { 
    address: 'Kimironko Market', 
    coordinates: { latitude: -1.9333, longitude: 30.1167 } 
  },
  { 
    address: 'University of Rwanda', 
    coordinates: { latitude: -1.9599, longitude: 30.1094 } 
  },
]

// Update the initial map viewport to center on Kigali
const [viewport, setViewport] = useState({
  latitude: -1.9441, // Kigali center
  longitude: 30.0619,
  zoom: 12,
  bearing: 0,
  pitch: 0
})