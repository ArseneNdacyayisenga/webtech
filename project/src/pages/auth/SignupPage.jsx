import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { signup, googleLogin } = useAuth()
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'rider',
    }
  })
  
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await signup(data)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleSignup = async () => {
    setIsLoading(true)
    try {
      await googleLogin()
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Create your account</h1>
        <p className="mt-2 text-gray-400">
          Join our community of riders and drivers
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          id="name"
          placeholder="John Doe"
          icon={<UserIcon className="h-5 w-5" />}
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
          })}
        />
        
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="your@email.com"
          icon={<EnvelopeIcon className="h-5 w-5" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        
        <Input
          label="Phone"
          type="tel"
          id="phone"
          placeholder="(123) 456-7890"
          icon={<PhoneIcon className="h-5 w-5" />}
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Phone number is required',
          })}
        />
        
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          icon={<LockClosedIcon className="h-5 w-5" />}
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
        />
        
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          icon={<LockClosedIcon className="h-5 w-5" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => 
              value === watch('password') || 'Passwords do not match',
          })}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            I want to:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="rider"
                className="h-4 w-4 border-gray-600 bg-dark-400 text-primary-600 focus:ring-primary-500"
                {...register('role')}
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-300">Ride</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                value="driver"
                className="h-4 w-4 border-gray-600 bg-dark-400 text-primary-600 focus:ring-primary-500"
                {...register('role')}
              />
              <span className="ml-2 text-sm text-gray-300">Drive</span>
            </label>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-dark-400 text-primary-600 focus:ring-primary-500"
            {...register('terms', {
              required: 'You must agree to the terms and conditions',
            })}
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
            I agree to the{' '}
            <a href="#" className="text-primary-500 hover:text-primary-400">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-500 hover:text-primary-400">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-danger-500">{errors.terms.message}</p>
        )}
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Create account
        </Button>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-400 text-gray-400">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            variant="outline"
            fullWidth
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                />
                <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                />
                <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                />
              </g>
            </svg>
            Sign up with Google
          </Button>
        </div>
      </div>
      
      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-primary-500 hover:text-primary-400"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}

export default SignupPage