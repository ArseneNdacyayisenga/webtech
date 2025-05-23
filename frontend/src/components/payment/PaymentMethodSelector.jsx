import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCardIcon, PhoneIcon } from '@heroicons/react/24/outline'

const PaymentMethodSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState('card')

  const handleSelect = (method) => {
    setSelected(method)
    onSelect(method)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white mb-4">Select Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect('card')}
          className={`
            p-4 rounded-lg border transition-all
            ${selected === 'card' 
              ? 'border-primary-500 bg-primary-900/20' 
              : 'border-dark-100 hover:bg-dark-300'
            }
          `}
        >
          <div className="flex items-center">
            <CreditCardIcon className="w-6 h-6 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Card Payment</p>
              <p className="text-sm text-gray-400">Visa or Mastercard</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleSelect('mobile_money')}
          className={`
            p-4 rounded-lg border transition-all
            ${selected === 'mobile_money' 
              ? 'border-primary-500 bg-primary-900/20' 
              : 'border-dark-100 hover:bg-dark-300'
            }
          `}
        >
          <div className="flex items-center">
            <PhoneIcon className="w-6 h-6 text-gray-400 mr-3" />
            <div className="text-left">
              <p className="text-white font-medium">Mobile Money</p>
              <p className="text-sm text-gray-400">MTN or Airtel Money</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default PaymentMethodSelector