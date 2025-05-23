import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import {
  ArrowPathIcon,
  PlusIcon,
  CreditCardIcon,
  BanknotesIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [transactions, setTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  })
  
  useEffect(() => {
    fetchPaymentData()
  }, [currentPage])
  
  const fetchPaymentData = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be API calls
      // Simulate with setTimeout for demo
      setTimeout(() => {
        // Mock payment methods
        setPaymentMethods([
          {
            id: 1,
            type: 'visa',
            last4: '4242',
            expiryDate: '12/25',
            isDefault: true,
          },
          {
            id: 2,
            type: 'mastercard',
            last4: '5555',
            expiryDate: '10/24',
            isDefault: false,
          },
        ])
        
        // Generate mock transactions
        const mockTransactions = []
        for (let i = 1; i <= 50; i++) {
          const date = new Date()
          date.setDate(date.getDate() - Math.floor(Math.random() * 90))
          
          mockTransactions.push({
            id: i,
            date: date.toISOString(),
            description: Math.random() > 0.3 ? 'Ride Payment' : 'Ride Credit',
            amount: Math.random() > 0.3 ? 
              -parseFloat((Math.random() * 50 + 10).toFixed(2)) : 
              parseFloat((Math.random() * 20 + 5).toFixed(2)),
            status: Math.random() > 0.1 ? 'completed' : 'pending',
            paymentMethod: Math.random() > 0.5 ? 'Visa •••• 4242' : 'Mastercard •••• 5555',
          })
        }
        
        // Sort by date (newest first)
        mockTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        
        // Paginate
        const itemsPerPage = 10
        const totalItems = mockTransactions.length
        setTotalPages(Math.ceil(totalItems / itemsPerPage))
        
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedTransactions = mockTransactions.slice(startIndex, endIndex)
        
        setTransactions(paginatedTransactions)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching payment data:', error)
      setIsLoading(false)
    }
  }
  
  const handleAddCard = () => {
    // In a real app, this would make an API call to add the card
    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      type: 'visa',
      last4: newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      isDefault: paymentMethods.length === 0,
    }
    
    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setShowAddCard(false)
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    })
  }
  
  const setDefaultPaymentMethod = (id) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    }))
    
    setPaymentMethods(updatedMethods)
  }
  
  const removePaymentMethod = (id) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id)
    
    // If we removed the default method and there are other methods,
    // make the first one the default
    if (paymentMethods.find(m => m.id === id)?.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }
    
    setPaymentMethods(updatedMethods)
  }
  
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM d, yyyy')
  }
  
  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-white mb-6">Payment Methods</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment methods section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Your Payment Methods</h2>
              
              {paymentMethods.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-400 mb-4">No payment methods added yet</p>
                  <Button
                    variant="primary"
                    onClick={() => setShowAddCard(true)}
                  >
                    Add Payment Method
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.div
                      key={method.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg border ${
                        method.isDefault ? 'border-primary-500 bg-primary-900/20' : 'border-dark-100 bg-dark-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {method.type === 'visa' ? (
                            <div className="w-10 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-semibold text-sm mr-3">
                              VISA
                            </div>
                          ) : (
                            <div className="w-10 h-8 bg-orange-600 rounded flex items-center justify-center text-white font-semibold text-sm mr-3">
                              MC
                            </div>
                          )}
                          <div>
                            <div className="text-white font-medium">
                              •••• •••• •••• {method.last4}
                            </div>
                            <div className="text-sm text-gray-400">
                              Expires {method.expiryDate}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removePaymentMethod(method.id)}
                          className="text-gray-400 hover:text-danger-500"
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                      
                      {!method.isDefault && (
                        <button
                          onClick={() => setDefaultPaymentMethod(method.id)}
                          className="mt-3 text-sm text-primary-500 hover:text-primary-400"
                        >
                          Set as default
                        </button>
                      )}
                      
                      {method.isDefault && (
                        <div className="mt-3 text-sm text-primary-500">
                          Default payment method
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  <Button
                    variant="outline"
                    fullWidth
                    icon={<PlusIcon className="w-5 h-5" />}
                    onClick={() => setShowAddCard(true)}
                  >
                    Add Payment Method
                  </Button>
                </div>
              )}
            </div>
            
            {/* Balance card */}
            <div className="card">
              <h3 className="text-lg font-medium text-white mb-4">Your Balance</h3>
              <div className="bg-gradient-to-r from-primary-900 to-primary-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-primary-200">Available credits</span>
                  <BanknotesIcon className="w-6 h-6 text-primary-200" />
                </div>
                <div className="text-2xl font-bold text-white mb-4">$32.50</div>
                <Button variant="outline" size="sm" className="bg-primary-800/50 border-primary-700">
                  Add Money
                </Button>
              </div>
            </div>
          </div>
          
          {/* Transactions section */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Transaction History</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-dark-100">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Payment Method
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100">
                    {transactions.map((transaction) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-dark-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {transaction.paymentMethod}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={transaction.amount > 0 ? 'text-success-500' : 'text-white'}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`
                            px-2 py-1 text-xs font-medium rounded-full
                            ${transaction.status === 'completed' ? 'bg-success-100 text-success-800' : 'bg-yellow-100 text-yellow-800'}
                          `}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-400">
                  Showing {transactions.length} of {totalPages * 10} transactions
                </div>
                
                <div className="flex space-x-1">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${
                      currentPage === 1 
                        ? 'text-gray-600 cursor-not-allowed' 
                        : 'text-gray-400 hover:bg-dark-200'
                    }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  
                  {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                    const pageNum = currentPage <= 3
                      ? i + 1
                      : currentPage >= totalPages - 2
                        ? totalPages - 4 + i
                        : currentPage - 2 + i
                    
                    if (pageNum <= totalPages && pageNum > 0) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-400 hover:bg-dark-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    }
                    return null
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${
                      currentPage === totalPages
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:bg-dark-200'
                    }`}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddCard(false)}></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-dark-300 rounded-lg shadow-lg p-6 w-full max-w-md z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Add Payment Method</h3>
              <button 
                onClick={() => setShowAddCard(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={newCard.cardNumber}
                onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                icon={<CreditCardIcon className="h-5 w-5" />}
              />
              
              <Input
                label="Cardholder Name"
                placeholder="John Doe"
                value={newCard.cardHolder}
                onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={newCard.expiryDate}
                  onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                />
                
                <Input
                  label="CVV"
                  placeholder="123"
                  value={newCard.cvv}
                  onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                />
              </div>
              
              <div className="flex items-center mt-2">
                <input
                  id="save-card"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-600 bg-dark-400 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="save-card" className="ml-2 text-sm text-gray-300">
                  Save as default payment method
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddCard(false)}
                >
                  Cancel
                </Button>
                
                <Button
                  onClick={handleAddCard}
                  disabled={
                    !newCard.cardNumber ||
                    !newCard.cardHolder ||
                    !newCard.expiryDate ||
                    !newCard.cvv
                  }
                >
                  Add Card
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default PaymentPage