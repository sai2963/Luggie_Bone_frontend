import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function CategoriesReturn({ CategoriesData }) {
  if (!CategoriesData || typeof CategoriesData !== "object") {
    console.error("Invalid CategoriesData format:", CategoriesData);
    return <p className="text-red-500 font-medium">Invalid Data</p>;
  }
  
  const categoriesArray = Object.values(CategoriesData); // Convert object to array
  
  // Container variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  // Item variants for individual animations
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500"
      >
        Explore Categories
      </motion.h2>
      
      {categoriesArray.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No categories found</p>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categoriesArray.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group"
            >
              <Link to={`/${item.name}`} className="block">
                <div className="rounded-xl overflow-hidden shadow-lg shadow-purple-900/20 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 p-1">
                  <div className="aspect-w-16 aspect-h-9 w-full relative rounded-lg overflow-hidden">
                    <motion.img 
                      src={item.ImageUrl[0]} 
                      alt={item.name} 
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1 }}
                        className="bg-black bg-opacity-70 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-500"
                      >
                        <span className="text-lg font-bold bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">
                          Explore {item.name}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">{item.name}</h3>
                    <p className="text-gray-300 text-sm">Discover amazing {item.name.toLowerCase()} options</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default CategoriesReturn;