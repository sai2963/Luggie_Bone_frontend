import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Home, Tags, Grid, PlusSquare } from "lucide-react";
import { Button } from "./components/ui/button";

export default function Header() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link to="/">
              <Button className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl font-bold">
                Luggie Bone
              </Button>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form action="/search" method="post" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Navigation */}
          <motion.nav
            className="flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { text: "Home", icon: Home, href: "/" },
              { text: "Brands", icon: Tags, href: "/brands" },
              { text: "Categories", icon: Grid, href: "/categories" },
              { text: "Cart", icon: ShoppingCart, href: "/cart" },
              { text: "Add", icon: PlusSquare, href: "/add" },
            ].map((item, index) => (
              <motion.span
                key={item.text}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 text-gray-300 hover:text-purple-400 cursor-pointer transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <Link to={item.href}>
                  <Button>{item.text}</Button>
                </Link>
              </motion.span>
            ))}
          </motion.nav>
        </div>
      </div>
    </motion.div>
  );
}
