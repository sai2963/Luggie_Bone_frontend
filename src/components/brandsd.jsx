import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("https://luggie-bone-backend.vercel.app/api/brands/");
        setBrands(response.data);
      } catch (error) {
        console.error("Error Fetching Brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // Increased stagger effect for more pronounced animation
      }
    }
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 12 // Adjusted for slightly bouncier animation
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto"> {/* Adjusted max width for better 2-column layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              Our Premium Brands
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our curated selection of world-class brands that define excellence and innovation
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-24 h-24">
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
                <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-300">Loading</span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8" // Changed to always show 2 columns on screens sm and larger
          >
            {Object.values(brands).map((brand, index) => (
                <Link to={`${brand.name}`}>
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl ring-1 ring-gray-700 hover:ring-purple-500 transition-all duration-300 h-72" // Increased height for better visibility
                onMouseEnter={() => setActiveVideo(index)}
                onMouseLeave={() => setActiveVideo(null)}
              >
                
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {activeVideo === index && brand.videoUrl && brand.videoUrl[0] ? (
                    <motion.video
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={brand.videoUrl[0]}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={brand.imageUrl && brand.imageUrl[0] ? brand.imageUrl[0] : "https://via.placeholder.com/400"}
                      alt={brand.name}
                      className="w-full h-full object-contain p-6 filter drop-shadow-2xl"
                    />
                  )}
                </div>
                
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6" // Increased padding
                >
                  <h3 className="text-2xl font-bold tracking-wide"> {/* Increased font size */}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
                      {brand.name}
                    </span>
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {brand.description || "Premium quality and exceptional craftsmanship"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explore
                  </motion.button>
                </motion.div>
                
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Brands;