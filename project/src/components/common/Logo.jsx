import { Link } from 'react-router-dom'

const Logo = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl'
  }
  
  return (
    <Link 
      to="/" 
      className={`font-bold ${sizeClasses[size]} flex items-center text-white`}
    >
      <div className="mr-2 bg-primary-600 text-white p-1 rounded-md">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      </div>
      RideShare
    </Link>
  )
}

export default Logo