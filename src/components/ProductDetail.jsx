import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`https://luggie-bone-backend.vercel.app/api/products/${id}`);
                setProduct(response.data);
                
                // Set default selections for size and color
                if (response.data?.product?.variants?.length > 0) {
                    const defaultVariant = response.data.product.variants[0];
                    setSelectedSize(defaultVariant.option1);
                    setSelectedColor(defaultVariant.option2);
                }
            }
            catch(error) {
                console.error("Error Fetching Data", error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const getSelectedVariant = () => {
        if (!product || !selectedSize || !selectedColor) return null;
        
        return product.product.variants.find(
            variant => variant.option1 === selectedSize && variant.option2 === selectedColor
        );
    };
    
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };
    
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };
    
    const handleImageClick = (index) => {
        setSelectedImage(index);
    };
    
    const handleAddToCart = () => {
        const selectedVariant = getSelectedVariant();
        if (selectedVariant) {
            alert(`Added to cart: ${product.product.title} - ${selectedVariant.title} (Quantity: ${quantity})`);
        }
    };
    
    const handleBuyNow = () => {
        const selectedVariant = getSelectedVariant();
        if (selectedVariant) {
            alert(`Buy Now: ${product.product.title} - ${selectedVariant.title} (Quantity: ${quantity})`);
            // Redirect to checkout page in a real app
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-semibold text-white flex flex-col items-center"
                >
                    <div className="w-16 h-16 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin mb-4"></div>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Loading Your Experience...
                    </div>
                </motion.div>
            </div>
        );
    }

    const selectedVariant = getSelectedVariant();
    const discountPercentage = selectedVariant ? 
        Math.round(((selectedVariant.compare_at_price - selectedVariant.price) / selectedVariant.compare_at_price) * 100) : 0;

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/70 z-10"></div>
                {product?.product?.images?.[0] && (
                    <div className="absolute inset-0">
                        <img 
                            src={product.product.images[0].src}
                            alt=""
                            className="w-full h-full object-cover opacity-30 blur-sm"
                        />
                    </div>
                )}
                <div className="container mx-auto px-4 py-20 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                            {product?.product?.title}
                        </h1>
                        <p className="text-xl text-gray-300">
                            {product?.product?.product_type || "Premium Collection"}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
                    {/* Product Images Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUpVariants}
                        className="space-y-8"
                    >
                        {/* Main Image */}
                        <motion.div 
                            className="rounded-2xl overflow-hidden h-96 flex items-center justify-center bg-gray-800 border border-gray-700 shadow-xl shadow-purple-900/20"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {product.product.images && product.product.images.length > 0 && (
                                <img 
                                    src={product.product.images[selectedImage].src} 
                                    alt={product.product.title} 
                                    className="max-h-full max-w-full object-contain"
                                />
                            )}
                        </motion.div>
                        
                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-5 gap-3">
                            {product.product.images && product.product.images.slice(0, 10).map((image, index) => (
                                <motion.div 
                                    key={image.id} 
                                    className={`rounded-lg cursor-pointer h-20 w-full flex items-center justify-center ${
                                        selectedImage === index 
                                            ? 'border-2 border-purple-500 bg-gray-800 shadow-lg shadow-purple-500/20' 
                                            : 'border border-gray-700 bg-gray-800'
                                    }`}
                                    onClick={() => handleImageClick(index)}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <img 
                                        src={image.src} 
                                        alt={`Thumbnail ${index}`} 
                                        className="max-h-full max-w-full object-contain p-2"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* Product Details Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUpVariants}
                        className="space-y-8"
                    >
                        {/* Brand and Title */}
                        <div>
                            <div className="text-purple-400 font-medium mb-2">{product.product.vendor}</div>
                            <h1 className="text-3xl font-bold">{product.product.title}</h1>
                            
                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {product.product.tags.map((tag, index) => (
                                    <motion.span 
                                        key={index} 
                                        className="inline-block bg-gray-800/70 border border-gray-700 rounded-full px-3 py-1 text-sm text-gray-300"
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(124, 58, 237, 0.2)" }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Pricing */}
                        {selectedVariant && (
                            <motion.div 
                                className="border-t border-b border-gray-700 py-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                        ₹{parseFloat(selectedVariant.price).toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 line-through">
                                        ₹{parseFloat(selectedVariant.compare_at_price).toLocaleString()}
                                    </span>
                                    <span className="bg-green-900/30 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
                                        {discountPercentage}% off
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400 mt-2">Inclusive of all taxes</div>
                            </motion.div>
                        )}
                        
                        {/* Size Selection */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-purple-300">Size</h3>
                            <div className="flex gap-3">
                                {Array.from(new Set(product.product.variants.map(variant => variant.option1))).map(size => (
                                    <motion.button
                                        key={size}
                                        onClick={() => handleSizeChange(size)}
                                        className={`px-5 py-3 border rounded-lg ${
                                            selectedSize === size 
                                                ? 'border-purple-500 bg-purple-900/30 text-white' 
                                                : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Color Selection */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-purple-300">Color</h3>
                            <div className="flex gap-3">
                                {Array.from(new Set(product.product.variants.map(variant => variant.option2))).map(color => (
                                    <motion.button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`px-5 py-3 border rounded-lg ${
                                            selectedColor === color 
                                                ? 'border-purple-500 bg-purple-900/30 text-white' 
                                                : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {color}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                        
                        {/* Quantity */}
                        <div>
                            <h3 className="text-lg font-medium mb-3 text-purple-300">Quantity</h3>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className="inline-flex border border-gray-700 rounded-lg bg-gray-800 overflow-hidden"
                            >
                                <button 
                                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    className="px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 px-3 py-2 text-center bg-gray-800 text-gray-100 border-x border-gray-700 focus:outline-none"
                                />
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 text-gray-300 hover:bg-gray-700 transition-colors"
                                >
                                    +
                                </button>
                            </motion.div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <motion.button 
                                onClick={handleAddToCart}
                                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-4 rounded-lg font-medium flex-1 shadow-lg shadow-purple-900/30"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                Add to Cart
                            </motion.button>
                            <motion.button 
                                onClick={handleBuyNow}
                                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium flex-1 shadow-lg shadow-pink-900/30"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                Buy Now
                            </motion.button>
                        </div>
                        
                        {/* Product Details */}
                        <motion.div 
                            className="border-t border-gray-700 pt-6"
                            whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "0.5rem" }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-medium mb-3 text-purple-300">Product Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-400">SKU</div>
                                <div>{selectedVariant?.sku || 'N/A'}</div>
                                
                                <div className="text-gray-400">Weight</div>
                                <div>{selectedVariant ? `${selectedVariant.grams / 1000} kg` : 'N/A'}</div>
                                
                                <div className="text-gray-400">Type</div>
                                <div>{product.product.product_type || 'N/A'}</div>
                            </div>
                        </motion.div>
                        
                        {/* Description */}
                        <motion.div 
                            className="border-t border-gray-700 pt-6"
                            whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)", borderRadius: "0.5rem" }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg font-medium mb-3 text-purple-300">Description</h3>
                            <div className="text-gray-300 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: product.product.body_html }} />
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Product Features & Specifications */}
                <motion.div 
                    className="mt-24 mb-24 bg-gradient-to-b from-gray-800/30 to-gray-900/30 border border-gray-800 rounded-2xl p-8 shadow-xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                >
                    <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Features & Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div 
                            className="space-y-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-medium text-xl text-purple-300 mb-6">Hard Luggage Specifications</h3>
                            <ul className="space-y-4">
                                {[
                                    "8 Wheel Trolley for smooth mobility",
                                    "Hard Shell for maximum protection",
                                    "TSA-approved lock for security",
                                    "Scratch-resistant exterior",
                                    "Spacious interior with divider",
                                    "Telescopic handle"
                                ].map((item, idx) => (
                                    <motion.li 
                                        key={idx} 
                                        className="flex items-center space-x-3 text-gray-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-xs">✓</span>
                                        <span>{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div 
                            className="space-y-4"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="font-medium text-xl text-purple-300 mb-6">Size Guide</h3>
                            <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 shadow-lg">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead className="bg-gray-900/50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase">Size</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase">Dimensions</th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-purple-300 uppercase">Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {[
                                            { size: "Cabin", dimensions: "56 cm", weight: "2.75 kg" },
                                            { size: "Medium", dimensions: "66 cm", weight: "3.5 kg" },
                                            { size: "Large", dimensions: "76 cm", weight: "4.2 kg" }
                                        ].map((item, idx) => (
                                            <motion.tr 
                                                key={idx} 
                                                className="hover:bg-gray-700/30 transition-colors"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap font-medium">{item.size}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.dimensions}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.weight}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
                
                {/* Customer Reviews */}
                <motion.div 
                    className="mt-24 mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                >
                    <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Customer Reviews</h2>
                    <motion.div 
                        className="border border-gray-800 rounded-2xl p-12 bg-gradient-to-r from-gray-800/30 to-gray-900/60 shadow-lg shadow-purple-900/5"
                        whileHover={{ boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 8px 10px -6px rgba(139, 92, 246, 0.1)" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-center">
                            <p className="text-xl text-gray-200 mb-3">No reviews yet</p>
                            <p className="text-gray-400 mb-8">Be the first to review this product</p>
                            <motion.button 
                                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-purple-900/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                Write a Review
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
                
                {/* Related Products */}
                <motion.div 
                    className="mt-24 pb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                >
                    <h2 className="text-2xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <motion.div 
                                key={item} 
                                className="border border-gray-800 rounded-xl p-5 bg-gradient-to-b from-gray-800/30 to-gray-900/30 hover:shadow-lg hover:shadow-purple-900/10 transition group"
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: item * 0.1, duration: 0.4 }}
                            >
                                <div className="aspect-square bg-gray-800 rounded-lg mb-5 flex items-center justify-center overflow-hidden group-hover:ring-2 group-hover:ring-purple-500 transition-all">
                                    <div className="text-gray-400 group-hover:scale-110 transition-transform duration-500">Product Image</div>
                                </div>
                                <h3 className="font-medium text-lg group-hover:text-purple-300 transition-colors">Similar Luggage {item}</h3>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">₹3,999</span>
                                    <span className="text-sm text-gray-500 line-through">₹7,999</span>
                                    <span className="ml-auto text-xs text-green-400">50% OFF</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            
            {/* Footer Banner */}
            <div className="relative overflow-hidden bg-gray-900 py-16">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/80 z-10"></div>
                {product?.product?.images?.[0] && (
                    <div className="absolute inset-0">
                        <img 
                            src={product.product.images[0].src}
                            alt=""
                            className="w-full h-full object-cover opacity-5 blur-md"
                        />
                    </div>
                )}
                <motion.div 
                    className="container mx-auto px-4 relative z-20 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6">
                        Experience Premium Travel
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Travel in style with our premium luggage collection. Designed for the modern traveler.
                    </p>
                    <motion.button 
                        className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-medium shadow-lg shadow-purple-900/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                    >
                        Explore Collection
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default ProductDetail;