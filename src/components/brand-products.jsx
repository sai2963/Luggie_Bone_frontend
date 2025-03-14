import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BrandProducts({ brand }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://luggie-bone-backend.vercel.app/api/brands/${brand}`
        );
        
        // Check if data exists and is an array
        if (response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.warn("API response is not an array:", response.data);
          setProducts([]);
          setError("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchProductData();
    } else {
      setLoading(false);
      setError("No brand specified");
    }
  }, [brand]);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 70,
      },
    },
  };

  if (error) {
    return (
      <div className="py-12 px-4 bg-black bg-opacity-90 min-h-screen flex justify-center items-center">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-800">
          {error}. Please check the console for more details.
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-black bg-opacity-90 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-t-4 border-l-4 border-purple-600 animate-spin"></div>
            <div className="w-12 h-12 rounded-full border-r-4 border-b-4 border-pink-500 animate-spin absolute top-0 animate-pulse"></div>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400 text-lg">No products found for this brand.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((item, index) => (
            <motion.div
              key={item.id || `product-${index}`}
              variants={cardVariants}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-gray-800"
            >
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Animated glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-700 group-hover:duration-200" />
              
              <div className="relative h-80 overflow-hidden">
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                
                <img
                  src={
                    (item.images && item.images[0]?.src) || 
                    (item.variants && item.variants[0]?.featured_image?.src) || 
                    "/fallback.jpg"
                  }
                  alt={item.title || `Product ${index + 1}`}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* New tag if product is new */}
                {index < 2 && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider text-white shadow-lg">
                    NEW
                  </div>
                )}
              </div>

              <div className="p-8 relative z-20">
                <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  {item.title || `Product ${index + 1}`}
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                  {item.body_html
                    ? item.body_html.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
                    : 'No description available'}
                </p>

                <div className="flex items-center justify-between mt-8">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3 rounded-xl border border-gray-700/30 shadow-lg">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      ${(item.variants && parseFloat(item.variants[0]?.price || "0").toFixed(2)) || "0.00"}
                    </span>
                  </div>

                  <Link
                    to={`/${item.id || index}`}
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    <span>Details</span>
                    <div className="ml-2">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>

                {/* Premium bottom border effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                
                {/* Side border effects */}
                <div className="absolute top-1/2 left-0 w-0.5 h-0 bg-gradient-to-b from-violet-600 to-fuchsia-600 transform -translate-y-1/2 group-hover:h-1/2 transition-all duration-700 delay-100" />
                <div className="absolute top-1/2 right-0 w-0.5 h-0 bg-gradient-to-b from-fuchsia-600 to-violet-600 transform -translate-y-1/2 group-hover:h-1/2 transition-all duration-700 delay-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Premium section divider */}
      <div className="w-full flex justify-center mt-16">
        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
    </div>
  );
}

export default BrandProducts;