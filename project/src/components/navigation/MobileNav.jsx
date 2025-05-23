import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  HomeIcon,
  MapIcon,
  ClockIcon,
  CreditCardIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const MobileNav = () => {
  const { user } = useAuth()
  
  // Navigation links based on user role
  const navigationLinks = user?.role === 'rider'
    ? [
        { name: 'Home', href: '/dashboard', icon: HomeIcon },
        { name: 'Book', href: '/book-ride', icon: MapIcon },
        { name: 'Rides', href: '/ride-history', icon: ClockIcon },
        { name: 'Payment', href: '/payment', icon: CreditCardIcon },
        { name: 'Profile', href: '/profile', icon: UserIcon },
      ]
    : [
        { name: 'Home', href: '/driver/dashboard', icon: HomeIcon },
        { name: 'Rides', href: '/ride-history', icon: ClockIcon },
        { name: 'Payment', href: '/payment', icon: CreditCardIcon },
        { name: 'Profile', href: '/profile', icon: UserIcon },
      ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-dark-300 border-t border-dark-100 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {navigationLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full py-1
              ${isActive ? 'text-primary-500' : 'text-gray-400 hover:text-white'}
            `}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default MobileNav