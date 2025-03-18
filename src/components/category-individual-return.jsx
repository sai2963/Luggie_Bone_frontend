import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Category_Individual_Return({ ProductsData }) {
  if (!ProductsData || typeof ProductsData !== "object") {
    return <div className="text-gray-400 text-center">No product data available</div>;
  }

  const ProductsArray = Object.values(ProductsData);

  if (!Array.isArray(ProductsArray[3])) {
    return <div className="text-gray-400 text-center">No valid product data available</div>;
  }

  const Products = ProductsArray[3]
    .map((item) => item.products)
    .flat();

  console.log("Flattened Products Array:", Products);

  return (
    <div className="bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Products.map((product, index) => {
          if (!product || typeof product !== "object") return null;

          const imageUrl =
            product.images?.[0]?.src ||
            product.variants?.[0]?.featured_image?.src ||
            "/fallback.jpg";
          const title = product.title || `Product ${index + 1}`;
          const price =
            product.variants?.[0]?.price
              ? parseFloat(product.variants[0].price).toFixed(2)
              : "0.00";

          return (
            <motion.div
              key={product.id || index}
              className="bg-gray-800 rounded-2xl p-4 shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <div className="mt-4 text-white font-semibold text-lg text-center">
                {title}
              </div>
              <div className="mt-2 flex justify-between items-center text-gray-300">
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  ${price}
                </span>
                <Link
                  to={`/${product.id || index}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-sm font-semibold transition duration-300 hover:opacity-80"
                >
                  View
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Category_Individual_Return;