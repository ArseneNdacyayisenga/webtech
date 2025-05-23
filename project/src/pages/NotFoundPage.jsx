import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-primary-500"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-4">
          <Button
            as={Link}
            to="/"
            variant="primary"
            size="lg"
          >
            Go Back Home
          </Button>
          
          <Button
            as="a"
            href="mailto:support@rideshare.com"
            variant="outline"
            size="lg"
          >
            Contact Support
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage