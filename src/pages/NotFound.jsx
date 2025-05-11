import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Icon declarations
  const FolderSearchIcon = getIcon('FolderSearch');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="bg-surface-100 dark:bg-surface-800 p-4 rounded-full"
          >
            <FolderSearchIcon className="w-16 h-16 text-primary" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          The document you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn btn-primary px-6 py-3 text-base inline-flex items-center"
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Return to Home
        </motion.button>
        
        <div className="mt-12 pt-6 border-t border-surface-200 dark:border-surface-700 text-sm text-surface-500 dark:text-surface-400">
          Need help? <a href="#" className="text-primary hover:underline">Contact support</a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;