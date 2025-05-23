import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-400 z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex space-x-2">
          <motion.div
            className="w-4 h-4 bg-primary-500 rounded-full"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.div
            className="w-4 h-4 bg-primary-500 rounded-full"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-4 h-4 bg-primary-500 rounded-full"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>
        <p className="mt-4 text-white text-lg font-medium">Loading...</p>
      </motion.div>
    </div>
  )
}

export default Loading