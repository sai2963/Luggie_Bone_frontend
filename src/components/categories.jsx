import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoriesReturn from "./categories-return";

function Categories() {
  const [categoriesdata, setCategoriesdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchData() {
      try {
        const response = await axios.get(
          "https://luggie-bone-backend.vercel.app/api/categories"
        );
        setCategoriesdata(response.data);
      } catch (error) {
        console.error("Error Fetching data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    FetchData();
  }, []);

  // Loading spinner animation
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <div className="relative w-24 h-24 mb-8">
              <motion.span 
                className="block w-24 h-24 border-4 border-t-purple-500 border-r-pink-500 border-b-amber-500 border-l-violet-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={spinTransition}
              />
              <motion.span 
                className="absolute top-2 left-2 block w-20 h-20 border-4 border-t-purple-400 border-r-pink-400 border-b-amber-400 border-l-violet-400 rounded-full"
                animate={{ rotate: -360 }}
                transition={{...spinTransition, duration: 1.5}}
              />
            </div>
            <motion.p 
              className="text-xl font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.98, 1, 0.98]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Loading Categories...
            </motion.p>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-6"
          >
            <motion.div 
              className="flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-red-500/30 shadow-lg shadow-red-500/20 max-w-md w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 mb-4 rounded-full bg-red-500/20 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-red-300">Unable to Load Categories</h3>
              <p className="text-gray-400 text-center">Something went wrong while fetching the categories. Please try again later.</p>
              <motion.button 
                className="mt-6 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full text-white font-medium shadow-lg shadow-red-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
              >
                Try Again
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <CategoriesReturn CategoriesData={categoriesdata} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Categories;