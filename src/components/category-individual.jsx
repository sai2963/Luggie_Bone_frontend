import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Category_Individual_Return from "./category-individual-return";
import { motion } from "framer-motion";

function Category_Individual() {
  const { category } = useParams();
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      console.log("Fetching category:", category);
      try {
        const responses = await axios.get(
          `https://luggie-bone-backend.vercel.app/api/categories`
        );
        console.log("API Response:", responses.data);
        
        const responsive = responses.data;
        // Check if category exists in the response
        if (!responsive[category]) {
          throw new Error(`Category "${category}" not found in API response`);
        }
        
        const response = responsive[category];
        console.log("Category data:", response);
        setProductsData(response);
      } catch (error) {
        console.error("Error Fetching Data", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [category]);

  // Premium loading animation
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="space-y-8">
          <motion.div
            className="flex justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div className="w-24 h-24 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
          </motion.div>
          <motion.p
            className="text-xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            Loading premium products...
          </motion.p>
        </div>
      </div>
    );
  }

  // Premium error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <motion.div
          className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            We encountered an issue
          </h2>
          <p className="text-gray-300 text-center mb-6">
            We couldn't load your premium products at this time
          </p>
          <div className="p-4 bg-gray-800/50 rounded-lg mb-6">
            <p className="text-red-400 font-mono text-sm overflow-auto">
              {error}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg shadow transition-all duration-300 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Products"}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Added a debug message to check if we're reaching this point */}
          <div className="text-white text-center mb-4">
            <p className="text-sm text-gray-400">Debug: Rendering Category_Individual_Return component</p>
          </div>
          <Category_Individual_Return ProductsData={productsData} />
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Category_Individual