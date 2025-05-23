import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import {
  ArrowPathIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  BellIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const ProfilePage = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('general')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  
  useEffect(() => {
    fetchUserData()
  }, [])
  
  const fetchUserData = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo, we'll use a timeout and mock data
      setTimeout(() => {
        const mockUserData = {
          id: 1,
          name: user?.name || 'John Doe',
          email: user?.email || 'john@example.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, New York, NY 10001',
          emergencyContact: '+1 (555) 987-6543',
          role: user?.role || 'rider',
          joined: '2022-06-15',
          avatar: user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg',
          twoFactorEnabled: true,
          emailNotifications: {
            rides: true,
            promotions: false,
            updates: true,
            security: true,
          },
          pushNotifications: {
            rides: true,
            promotions: true,
            updates: false,
            security: true,
          },
        }
        
        setUserData(mockUserData)
        setFormData({
          name: mockUserData.name,
          email: mockUserData.email,
          phone: mockUserData.phone,
          address: mockUserData.address,
          emergencyContact: mockUserData.emergencyContact,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching user data:', error)
      setIsLoading(false)
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // In a real app, this would make an API call to update user data
    setUserData({
      ...userData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
    })
    
    setIsEditing(false)
  }
  
  const handlePasswordChange = (e) => {
    e.preventDefault()
    
    // In a real app, this would make an API call to update the password
    alert('Password updated successfully!')
    
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }
  
  const handleNotificationChange = (type, category, value) => {
    setUserData({
      ...userData,
      [`${type}Notifications`]: {
        ...userData[`${type}Notifications`],
        [category]: value,
      },
    })
  }
  
  const toggleTwoFactor = () => {
    setUserData({
      ...userData,
      twoFactorEnabled: !userData.twoFactorEnabled,
    })
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ArrowPathIcon className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    )
  }
  
  return (
    <div className="container">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="card overflow-hidden">
            {/* Profile image and name */}
            <div className="text-center p-6 border-b border-dark-100">
              <div className="relative inline-block">
                <img 
                  src={userData.avatar} 
                  alt={userData.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-primary-600 rounded-full p-1 text-white hover:bg-primary-700">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-xl font-semibold text-white mt-4">{userData.name}</h2>
              <p className="text-gray-400">{userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}</p>
              <p className="text-sm text-gray-500 mt-1">Member since {new Date(userData.joined).toLocaleDateString()}</p>
            </div>
            
            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('general')}
                    className={`
                      w-full flex items-center px-4 py-2.5 rounded-lg transition-colors
                      ${activeTab === 'general' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-200'}
                    `}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    General
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`
                      w-full flex items-center px-4 py-2.5 rounded-lg transition-colors
                      ${activeTab === 'security' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-200'}
                    `}
                  >
                    <LockClosedIcon className="w-5 h-5 mr-3" />
                    Security
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`
                      w-full flex items-center px-4 py-2.5 rounded-lg transition-colors
                      ${activeTab === 'notifications' ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-dark-200'}
                    `}
                  >
                    <BellIcon className="w-5 h-5 mr-3" />
                    Notifications
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="card">
            {/* General tab */}
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsEditing(false)
                          setFormData({
                            ...formData,
                            name: userData.name,
                            email: userData.email,
                            phone: userData.phone,
                            address: userData.address,
                            emergencyContact: userData.emergencyContact,
                          })
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        icon={<UserIcon className="h-5 w-5" />}
                      />
                      
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        icon={<EnvelopeIcon className="h-5 w-5" />}
                      />
                      
                      <Input
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        icon={<PhoneIcon className="h-5 w-5" />}
                      />
                      
                      <Input
                        label="Emergency Contact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        icon={<PhoneIcon className="h-5 w-5" />}
                      />
                    </div>
                    
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      icon={<MapPinIcon className="h-5 w-5" />}
                    />
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Full Name</p>
                        <p className="text-white">{userData.name}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Email</p>
                        <p className="text-white">{userData.email}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                        <p className="text-white">{userData.phone}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Emergency Contact</p>
                        <p className="text-white">{userData.emergencyContact}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Address</p>
                      <p className="text-white">{userData.address}</p>
                    </div>
                  </div>
                )}
                
                {/* Trip preferences section */}
                <div className="mt-8 pt-6 border-t border-dark-100">
                  <h3 className="text-lg font-medium text-white mb-4">Ride Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-dark-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <div>
                            <p className="text-white">Language</p>
                            <p className="text-sm text-gray-400">English (US)</p>
                          </div>
                        </div>
                        <button className="text-primary-500 text-sm hover:text-primary-400">
                          Change
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-dark-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <div>
                            <p className="text-white">Currency</p>
                            <p className="text-sm text-gray-400">USD ($)</p>
                          </div>
                        </div>
                        <button className="text-primary-500 text-sm hover:text-primary-400">
                          Change
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-dark-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                          <div>
                            <p className="text-white">Location Sharing</p>
                            <p className="text-sm text-gray-400">While using the app</p>
                          </div>
                        </div>
                        <button className="text-primary-500 text-sm hover:text-primary-400">
                          Change
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-dark-300 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          <div>
                            <p className="text-white">Preferred Ride Type</p>
                            <p className="text-sm text-gray-400">Standard</p>
                          </div>
                        </div>
                        <button className="text-primary-500 text-sm hover:text-primary-400">
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Security tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
                
                {/* Password change section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <Input
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      icon={<LockClosedIcon className="h-5 w-5" />}
                    />
                    
                    <Input
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      icon={<LockClosedIcon className="h-5 w-5" />}
                    />
                    
                    <Input
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      icon={<LockClosedIcon className="h-5 w-5" />}
                    />
                    
                    <Button
                      type="submit"
                      disabled={!formData.currentPassword || !formData.newPassword || formData.newPassword !== formData.confirmPassword}
                    >
                      Update Password
                    </Button>
                  </form>
                </div>
                
                {/* Two-factor authentication */}
                <div className="mb-8 pt-6 border-t border-dark-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-gray-400 mt-1">
                        Add an extra layer of security to your account by requiring a verification code in addition to your password.
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="mr-3 text-sm text-gray-400">
                        {userData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <button
                        onClick={toggleTwoFactor}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.twoFactorEnabled ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  {userData.twoFactorEnabled && (
                    <div className="bg-dark-300 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="p-2 bg-primary-900/50 rounded-full mr-3">
                          <ShieldCheckIcon className="w-5 h-5 text-primary-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Two-factor authentication is enabled</p>
                          <p className="text-sm text-gray-400 mt-1">
                            You'll be asked for a verification code when you sign in on a new device.
                          </p>
                          <button className="text-primary-500 text-sm hover:text-primary-400 mt-2">
                            Configure settings
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Login sessions */}
                <div className="mb-8 pt-6 border-t border-dark-100">
                  <h3 className="text-lg font-medium text-white mb-4">Active Sessions</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-dark-300 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-white font-medium">Windows PC - Chrome</p>
                            <p className="text-xs text-gray-400 mt-1">
                              New York, USA • Current session
                            </p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                          Active
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-dark-300 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-white font-medium">iPhone 13 - Mobile App</p>
                            <p className="text-xs text-gray-400 mt-1">
                              New York, USA • Last active 2 hours ago
                            </p>
                          </div>
                        </div>
                        <button className="text-sm text-danger-500 hover:text-danger-400">
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-4 text-primary-500 text-sm hover:text-primary-400">
                    Sign out of all devices
                  </button>
                </div>
                
                {/* Delete account */}
                <div className="pt-6 border-t border-dark-100">
                  <h3 className="text-lg font-medium text-danger-500 mb-2">Delete Account</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Once you delete your account, there is no going back. This action is permanent.
                  </p>
                  <Button variant="danger">Delete Account</Button>
                </div>
              </motion.div>
            )}
            
            {/* Notifications tab */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
                
                {/* Email notifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Ride Updates</p>
                        <p className="text-sm text-gray-400">Receive notifications about your rides</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('email', 'rides', !userData.emailNotifications.rides)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.emailNotifications.rides ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.emailNotifications.rides ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Promotions and Discounts</p>
                        <p className="text-sm text-gray-400">Receive offers and marketing emails</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('email', 'promotions', !userData.emailNotifications.promotions)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.emailNotifications.promotions ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.emailNotifications.promotions ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">App Updates</p>
                        <p className="text-sm text-gray-400">Receive notifications about new features</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('email', 'updates', !userData.emailNotifications.updates)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.emailNotifications.updates ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.emailNotifications.updates ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Security Alerts</p>
                        <p className="text-sm text-gray-400">Receive security notifications</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('email', 'security', !userData.emailNotifications.security)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.emailNotifications.security ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.emailNotifications.security ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Push notifications */}
                <div className="pt-6 border-t border-dark-100">
                  <h3 className="text-lg font-medium text-white mb-4">Push Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Ride Updates</p>
                        <p className="text-sm text-gray-400">Receive notifications about your rides</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('push', 'rides', !userData.pushNotifications.rides)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.pushNotifications.rides ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.pushNotifications.rides ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Promotions and Discounts</p>
                        <p className="text-sm text-gray-400">Receive offers and marketing notifications</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('push', 'promotions', !userData.pushNotifications.promotions)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.pushNotifications.promotions ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.pushNotifications.promotions ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">App Updates</p>
                        <p className="text-sm text-gray-400">Receive notifications about new features</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('push', 'updates', !userData.pushNotifications.updates)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.pushNotifications.updates ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.pushNotifications.updates ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-dark-300 rounded-lg">
                      <div>
                        <p className="text-white">Security Alerts</p>
                        <p className="text-sm text-gray-400">Receive security notifications</p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange('push', 'security', !userData.pushNotifications.security)}
                        className={`
                          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none
                          ${userData.pushNotifications.security ? 'bg-primary-600' : 'bg-dark-100'}
                        `}
                      >
                        <span
                          className={`
                            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                            ${userData.pushNotifications.security ? 'translate-x-5' : 'translate-x-0'}
                          `}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage