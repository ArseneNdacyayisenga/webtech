import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import OtpInput from 'react-otp-input'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/common/Button'

const TwoFactorAuthPage = () => {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { verify2FA, tempEmail } = useAuth()
  
  const handleVerify = async () => {
    if (otp.length !== 6) return
    
    setIsLoading(true)
    try {
      await verify2FA(otp)
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Two-Factor Authentication</h1>
        <p className="mt-2 text-gray-400">
          Enter the 6-digit code sent to your device
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Email display */}
        {tempEmail && (
          <div className="bg-dark-300 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-400">Verifying account</p>
            <p className="text-white font-medium">{tempEmail}</p>
          </div>
        )}
        
        {/* OTP Input */}
        <div className="mt-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="w-2"></span>}
            renderInput={(props) => <input {...props} />}
            containerStyle="flex justify-center space-x-2"
            inputStyle={{
              width: '3rem',
              height: '3rem',
              fontSize: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #374151',
              backgroundColor: '#1f2937',
              color: 'white',
              textAlign: 'center',
              outline: 'none',
            }}
            focusStyle={{
              border: '1px solid #8b5cf6',
              boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.3)',
            }}
          />
        </div>
        
        {/* Verify button */}
        <Button
          fullWidth
          onClick={handleVerify}
          disabled={otp.length !== 6}
          isLoading={isLoading}
        >
          Verify
        </Button>
        
        {/* Resend code */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Didn't receive a code?{' '}
            <button className="text-primary-500 hover:text-primary-400">
              Resend code
            </button>
          </p>
        </div>
        
        {/* Back to login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-white"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default TwoFactorAuthPage