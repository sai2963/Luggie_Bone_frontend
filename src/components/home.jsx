import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Sparkles } from "lucide-react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = axios.get("https://vipbags.com/collections/new-arrivals/products.json");
        const response4 = axios.get("https://vipbags.com/collections/bestsellers/products.json");
        const response5 = axios.get("https://vipbags.com/collections/hard-luggage/products.json");
        const response6 = axios.get("https://vipbags.com/collections/soft-luggage/products.json");
        const response7 = axios.get("https://vipbags.com/collections/cabin-luggage/products.json");
        const response8 = axios.get("https://vipbags.com/collections/check-in-luggage/products.json");
        const response9 = axios.get("https://vipbags.com/collections/lightweight-luggage/products.json");
        const response10 = axios.get("https://vipbags.com/collections/luggage-set/products.json");
  
        const responses = await Promise.all([
          response3,
          response4,
          response5,
          response6,
          response7,
          response8,
          response9,
          response10
        ]);
  
        const combinedData = responses.reduce((acc, response) => {
          return acc.concat(response.data.products);
        }, []);
  
        setData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-xl font-medium">Loading premium collection...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl bg-red-900/20 px-6 py-4 rounded-lg border border-red-500/20 backdrop-blur-sm">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-gray-900 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-violet-400"
          >
            Premium Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Discover our exquisite selection of premium luggage
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center w-full mb-16"
        >
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your perfect luggage..."
              className="w-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl pl-12 pr-4 py-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-lg transition-all duration-300"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-gray-500" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-25 blur-xl -z-10" />
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={cardVariants}
              className="group relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                <motion.img
                  src={item.images[0].src}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="p-8 relative z-20">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">
                  {item.title}
                </h2>

                <div className="flex items-center justify-between mt-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-700/30">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                      ${parseFloat(item.variants[0].price).toFixed(2)}
                    </span>
                  </div>

                  <Link
                    to={`/details/${item.id}`}
                    className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    <span>View Details</span>
                    <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-violet-600 to-fuchsia-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}