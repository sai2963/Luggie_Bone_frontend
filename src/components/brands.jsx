import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Brandsd from "./brandsd";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://luggie-bone-backend.vercel.app/api/brands/"
        );
        setBrands(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error Fetching Brands", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // Set up the automatic sliding
  useEffect(() => {
    if (brands.length > 0 && !isHovering) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Create new interval for auto-sliding
      intervalRef.current = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % Object.values(brands).length
        );
      }, 5000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [brands, isHovering]);

  // Handle mouse enter/leave for video playing
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Variants for slide animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
            <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-purple-300">Loading</span>
          </div>
        </div>
      </div>
    );
  }

  const brandArray = Object.values(brands);
  const currentBrand = brandArray[currentIndex];

  return (
    <>
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Heading with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 right-0 z-10 p-8 bg-gradient-to-b from-black/90 to-transparent"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              Our Premium Brands
            </span>
          </h1>
        </motion.div>

        {/* Full-screen brand carousel */}
        <div className="relative w-full h-screen">
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentIndex}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 flex items-center justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Conditionally render image or video based on hover state */}
              {isHovering ? (
                <motion.video
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={currentBrand?.videoUrl[0]}
                  autoPlay
                  muted
                  loop
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.img
                  src={currentBrand?.imageUrl[0]}
                  alt={currentBrand?.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Brand info overlay */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
              >
                <h2 className="text-4xl font-bold mb-2">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">
                    {currentBrand?.name}
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl">
                  {currentBrand?.description ||
                    "Premium quality and exceptional craftsmanship"}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {brandArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 w-6"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Subtle gradient overlay */}

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-black/20 pointer-events-none"></div>
      </div>

      <div>
        <Brandsd />
      </div>
    </>
  );
}

export default Brands;
