```jsx
import { useEffect, useRef } from 'react'

const GoogleMap = ({ 
  pickup, 
  dropoff, 
  onPickupSelect, 
  onDropoffSelect 
}) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({
    pickup: null,
    dropoff: null,
  })

  useEffect(() => {
    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: -1.9441, lng: 30.0619 }, // Kigali center
        zoom: 12,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#746855"}]
          },
          // Add more styles as needed
        ]
      })

      // Initialize autocomplete
      const pickupInput = document.getElementById('pickup-input')
      const dropoffInput = document.getElementById('dropoff-input')

      const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
        bounds: {
          north: -1.9333,
          south: -2.0167,
          east: 30.1167,
          west: 30.0167,
        },
        componentRestrictions: { country: 'RW' }
      })

      const dropoffAutocomplete = new google.maps.places.Autocomplete(dropoffInput, {
        bounds: {
          north: -1.9333,
          south: -2.0167,
          east: 30.1167,
          west: 30.0167,
        },
        componentRestrictions: { country: 'RW' }
      })

      pickupAutocomplete.addListener('place_changed', () => {
        const place = pickupAutocomplete.getPlace()
        if (place.geometry) {
          onPickupSelect({
            address: place.formatted_address,
            coordinates: {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            }
          })
        }
      })

      dropoffAutocomplete.addListener('place_changed', () => {
        const place = dropoffAutocomplete.getPlace()
        if (place.geometry) {
          onDropoffSelect({
            address: place.formatted_address,
            coordinates: {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            }
          })
        }
      })
    }

    // Update markers
    if (pickup?.coordinates) {
      if (markersRef.current.pickup) {
        markersRef.current.pickup.setMap(null)
      }
      markersRef.current.pickup = new google.maps.Marker({
        position: { 
          lat: pickup.coordinates.latitude, 
          lng: pickup.coordinates.longitude 
        },
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#8b5cf6',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      })
    }

    if (dropoff?.coordinates) {
      if (markersRef.current.dropoff) {
        markersRef.current.dropoff.setMap(null)
      }
      markersRef.current.dropoff = new google.maps.Marker({
        position: { 
          lat: dropoff.coordinates.latitude, 
          lng: dropoff.coordinates.longitude 
        },
        map: mapInstanceRef.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#f97316',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      })
    }

    // Fit bounds if both markers are present
    if (pickup?.coordinates && dropoff?.coordinates) {
      const bounds = new google.maps.LatLngBounds()
      bounds.extend({ 
        lat: pickup.coordinates.latitude, 
        lng: pickup.coordinates.longitude 
      })
      bounds.extend({ 
        lat: dropoff.coordinates.latitude, 
        lng: dropoff.coordinates.longitude 
      })
      mapInstanceRef.current.fitBounds(bounds, {
        padding: { top: 50, right: 50, bottom: 50, left: 50 }
      })
    }
  }, [pickup, dropoff])

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg" />
  )
}

export default GoogleMap
```