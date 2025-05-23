import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { LockClosedIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })
  
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await resetPassword(token, data.password)
      if (result.success) {
        navigate('/login')
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
        <h1 className="text-3xl font-bold text-white">Reset your password</h1>
        <p className="mt-2 text-gray-400">
          Enter your new password below
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New Password"
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
          label="Confirm New Password"
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
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Reset password
        </Button>
      </form>
    </motion.div>
  )
}

export default ResetPasswordPage