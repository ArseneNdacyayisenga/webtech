import { forwardRef } from 'react'

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  icon = null,
  className = '',
  ...props
}, ref) => {
  // Variants
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
    outline: 'border border-dark-100 hover:bg-dark-300 text-white',
    ghost: 'text-white hover:bg-dark-300',
    danger: 'bg-danger-600 hover:bg-danger-700 text-white',
    success: 'bg-success-600 hover:bg-success-700 text-white',
  }
  
  // Sizes
  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    default: 'py-2.5 px-6',
    lg: 'py-3 px-8 text-lg'
  }
  
  // Loading indicator
  const LoadingIndicator = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
  
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        flex items-center justify-center rounded-lg font-medium transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && <LoadingIndicator />}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button