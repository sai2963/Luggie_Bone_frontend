import { useSelector, useDispatch } from "react-redux";
import { removeCart, clearCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  // Container animation (slides up when in view)
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  // Children animation for list items
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-16 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div 
        className="max-w-3xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
        variants={itemVariants}
      >
        <div className="p-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-8">
            Shopping Cart
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-gray-400 mb-1 text-sm font-medium">Total Items</p>
              <p className="text-3xl font-bold text-white">{totalQuantity}</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-gray-400 mb-1 text-sm font-medium">Total Price</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                ${totalAmount.toFixed(2)}
              </p>
            </motion.div>
          </div>
          
          <motion.button
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-xl transform transition-all duration-300 hover:from-indigo-500 hover:to-purple-500 mb-10"
            onClick={() => dispatch(clearCart())}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Cart
          </motion.button>
          
          <div className="space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <motion.div 
                  key={item.variantId}
                  className="bg-gray-900 bg-opacity-60 rounded-xl border border-gray-700 shadow-md overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Link 
                          to={`/${item.productId}`}
                          className="text-lg font-medium text-white hover:text-purple-400 transition-colors"
                        >
                          {item.productTitle}
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">{item.variantTitle}</p>
                      </div>
                      <motion.button
                        className="ml-4 py-2 px-4 bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white rounded-lg text-sm font-medium transition-all duration-200"
                        onClick={() => dispatch(removeCart(item.variantId))}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Remove
                      </motion.button>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                      <p className="text-gray-300">
                        <span className="text-sm">{item.quantity} x </span>
                        <span className="font-medium">${Number(item.price).toFixed(2)}</span>
                      </p>
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-16 px-4"
                variants={itemVariants}
              >
                <div className="inline-block p-4 mb-4 rounded-full bg-gray-800 bg-opacity-70">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <p className="text-gray-300 text-xl font-medium mb-2">Your cart is empty</p>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                <Link to="/" className="inline-block py-3 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                  Continue Shopping
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;