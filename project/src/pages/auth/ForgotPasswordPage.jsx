import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { requestPasswordReset } = useAuth()
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      email: '',
    }
  })
  
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await requestPasswordReset(data.email)
      if (result.success) {
        setIsSubmitted(true)
      }
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
      <Link 
        to="/login"
        className="flex items-center text-primary-500 hover:text-primary-400 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        <span className="text-sm">Back to sign in</span>
      </Link>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Forgot your password?</h1>
        <p className="mt-2 text-gray-400">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {isSubmitted ? (
        <div className="bg-dark-300 p-6 rounded-lg border border-dark-100">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-success-900">
            <svg 
              className="h-6 w-6 text-success-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-white text-center">
            Check your email
          </h3>
          <p className="mt-2 text-gray-400 text-center">
            We've sent a password reset link to your email address. Please check your inbox.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              fullWidth
              onClick={() => setIsSubmitted(false)}
            >
              Resend email
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Send reset link
          </Button>
        </form>
      )}
    </motion.div>
  )
}

export default ForgotPasswordPage