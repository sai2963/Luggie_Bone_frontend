import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BrandProducts from "./brand-products";

function IndividualBrand() {
    const { brand } = useParams();
    const [brandDetails, setBrandDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
        const fetchBrandData = async () => {
            console.log("Brand from params:", brand);
            
            try {
                const response = await axios.get("https://luggie-bone-backend.vercel.app/api/brands/");
                const brandsData = response.data;
                const brandData = brandsData[brand];
                
                console.log("All brands data:", brandsData);
                console.log("Selected brand data:", brandData);
                
                setBrandDetails(brandData);
            } catch (error) {
                console.error("Error fetching brand data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBrandData();
    }, [brand]);
    
    // Image slider functionality - only when not hovering
    useEffect(() => {
        if (!brandDetails || !brandDetails.imageUrl || isHovering) return;
        
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === brandDetails.imageUrl.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        
        return () => clearInterval(interval);
    }, [brandDetails, isHovering]);
    
    // Handle dot navigation
    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="w-16 h-16 border-4 border-t-purple-500 border-r-blue-500 border-b-teal-500 border-l-pink-500 rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (!brandDetails) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-2xl text-white font-bold">Brand not found</div>
            </div>
        );
    }
    
    // Match videos with images, handling cases where they have different lengths
    const matchedVideos = brandDetails.imageUrl.map((_, index) => {
        // If there are fewer videos than images, cycle through videos
        const videoIndex = index % brandDetails.videoUrl.length;
        return brandDetails.videoUrl[videoIndex];
    });
    
    return (
        <>
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-16 px-4 md:px-8"
        >
            <div className="max-w-6xl mx-auto">
                <motion.h1 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent"
                >
                    {brandDetails.name}
                </motion.h1>
                
                {/* Main Showcase */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="relative w-full h-96 md:h-[600px] overflow-hidden rounded-2xl shadow-2xl group">
                        {/* Images */}
                        {brandDetails.imageUrl && brandDetails.imageUrl.length > 0 && (
                            <>
                                {brandDetails.imageUrl.map((image, index) => (
                                    <div
                                        key={`image-${index}`}
                                        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                                            currentImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                        } group-hover:opacity-0`}
                                    >
                                        <img 
                                            src={image} 
                                            alt={`${brandDetails.name} image ${index + 1}`} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                        
                        {/* Videos */}
                        {brandDetails.videoUrl && brandDetails.videoUrl.length > 0 && (
                            <>
                                {matchedVideos.map((videoUrl, index) => (
                                    <div
                                        key={`video-${index}`}
                                        className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                            currentImageIndex === index ? 'z-20' : 'z-0'
                                        }`}
                                    >
                                        <video 
                                            key={`video-element-${index}-${videoUrl}`}
                                            src={videoUrl} 
                                            className="w-full h-full object-cover"
                                            autoPlay={false}
                                            muted
                                            playsInline
                                            loop
                                            onMouseEnter={(e) => e.target.play()}
                                            onMouseLeave={(e) => {
                                                e.target.pause();
                                                e.target.currentTime = 0;
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        )}
                        
                        {/* Hover indicator */}
                        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black bg-opacity-60 rounded-full p-4 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Navigation dots - positioned at the bottom with high z-index */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-50">
                            {brandDetails.imageUrl.map((_, index) => (
                                <button
                                    key={`dot-${index}`}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-4 h-4 rounded-full border-2 border-white transition-all focus:outline-none ${
                                        currentImageIndex === index 
                                            ? 'bg-white' 
                                            : 'bg-transparent'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
                
               
                
              
            </div>
        </motion.div>

        <div>
            <BrandProducts brand={brand}/>
        </div>
        </>
        
    );
}

export default IndividualBrand;