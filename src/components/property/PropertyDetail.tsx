import Layout from "@/pages/Layout/Layout";
import { Property } from "@/types/Property";
import { motion } from "framer-motion";
import { useState } from "react";

interface PropertyDetailProps {
    property : Property;
}

export default function PropertyDetail({ property } : PropertyDetailProps) {
    const [selectedImage,  setSelectedImage] = useState(0);

    // Extract address information
    const { subDistrict, city, province, postalCode } = property.address ?? {};

    // Build full location string
    const locationParts = [subDistrict, city, province, postalCode].filter(Boolean);
    const fullLocation = locationParts.join(",");

    // Prepare list of imageUrl
    const images : string[] = (() => {
        if (property.propertyImages && property.propertyImages.length > 0) {
            return [...property.propertyImages]
                .map(img => img.imageUrl)
                .filter((url): url is string => Boolean(url));
        }

        // fallback to single primary image
        return property.imageUrl ? [property.imageUrl] : [];
    })();

    // Calculate time since posted
    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "today";
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 60) return "1 month ago";
        return `${Math.floor(diffDays / 30)} months ago`;
    }

    // Mock features - in production, you'd get this from backend
      const features = [
        { icon: "🚗", label: "Carport" },
        { icon: "🌳", label: "Garden" },
        { icon: "🏠", label: "Living Room" },
        { icon: "👨‍👩‍👧", label: "Family Room" },
        { icon: "🍳", label: "Kitchen" },
        { icon: "🛁", label: "Ensuite Bathroom" },
        { icon: "⚡", label: "Electricity 2200W" },
        { icon: "💧", label: "Water Supply" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden : { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white">
            {/* Header - Reuse your existing header component */}
            <Layout>
                {/* Breadcrumb */}
                <div className="max-w-[1400px] mx-auto px-5 py-5">
                    <div className="text-sm text-gray-400">
                        <a href="/" className="text-blue-400 hover:text-blue-300">Home</a>
                        {" / "}
                        <a href="/properties" className="text-blue-400 hover:text-blue-300">Properties</a>
                        {" / "}
                        <span className="text-white">{property.title}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-[1400px] mx-auto px-5">
                    {/* Image Gallery */}
                    <div className="mb-10">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative h-[500px] rounded-2x1 overflow-hidden bg-gray-800 mb-5"
                        >
                            {images.length > 0? ( 
                                <img 
                                    src={images[selectedImage]} 
                                    alt={property.title}
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl">
                                    No Image Available
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e via-transparent to-transparent]"></div>

                            {/* Badges */}
                            <div className="absolute top-5 left-5 flex gap-3">
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                    {property.type === "SALE" ? "FOR SALE" : "FOR RENT"}
                                </span>
                                {property.hasPanorama && (
                                    <span className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                                        360° TOUR
                                    </span>
                                )}
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute top-1/2 left-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />                            
                        </motion.div>

                        {/* Thumbnail Grid */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-6 gap-3">
                                {images.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`h-{100px} rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === idx
                                                ? "border-blue-500 shadow-lg shadow-blue-500/50"
                                                : "border-white/20 hover:border-white/50"
                                        }`}
                                    >
                                        <img src="img" alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Content Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20"
                    >
                        {/* Left Column - Main Info */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Title & Price Section */}
                            <motion.div variants={itemVariants} className="border-b border-white/10 pb-6">
                                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                                    {property.title}
                                </h1>

                                <div className="mb-3">
                                    <span className="text-5xl font-bold text-blue-400">
                                        Rp {property.price.toLocaleString("id-ID")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-300 text-base">
                                    <span>📍</span>
                                    <span>{fullLocation || "Location not specified"}</span>
                                </div>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {property.bedrooms && (
                                    <div className="bg-[#1e293b] p-5 rounded-xl border border-white/10 text-center">
                                        <div className="text-3xl mb-2">🛏️</div>
                                        <div className="text-2xl font-bold mb-1">{property.bedrooms}</div>
                                        <div className="text-sm text-gray-400">Bedrooms</div>
                                    </div>
                                )}

                                {property.bathrooms && (
                                    <div className="bg-[#1e293b] p-5 rounded-xl border border-white/10 text-center">
                                        <div className="text-3xl mb-2">🚿</div>
                                        <div className="text-2xl font-bold mb-1">{property.bathrooms}</div>
                                        <div className="text-sm text-gray-400">Bathrooms</div>
                                    </div>
                                )}

                                {property.area && (
                                    <div className="bg-[#1e293b] p-5 rounded-xl border border-white/10 text-center">
                                        <div className="text-3xl mb-2">📐</div>
                                        <div className="text-2xl font-bold mb-1">{property.area}m²</div>
                                        <div className="text-sm text-gray-400">Land Area</div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Description */}
                            {property.description && (
                                <motion.div variants={itemVariants} className="bg-[#1e293b] p-7 rounded-xl border border-white/10">
                                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <span>📝</span>
                                        Description
                                    </h2>    
                                    <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                                        {property.description}
                                    </p>
                                </motion.div>
                            )}

                            {/* Features */}
                            <motion.div variants={itemVariants} className="bg-[#1e293b] p-7 rounded-xl border border-white/10">
                                <h2 className="text-2xl font-bold mb-4 flex items-center ga-3">
                                    <span>✨</span>
                                    Property Features
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 p-3 bg-[#0f172a] rounded-lg text-sm"
                                        >
                                            <div className="w-6 h-6 bg-blue-6-- rounded-md flex items-center justify-center text-xs">
                                                {feature.icon}
                                            </div>
                                            <span>{feature.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Right Sidebar */}
                        <div className="lg-col-span-1">
                            <div className="sticky top-5 space-y-6">
                                {/* Agent Card */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-7 rounded-2xl border border-white/10"
                                >
                                    <div className="text-center mb-6">
                                        <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                                            👤
                                        </div>
                                        <div className="text-xl font-bold mb-1">
                                            {property.agentName || "Property Agent"}
                                        </div>
                                        <div className="text-sm text-gray-400">Property Consultant</div>
                                    </div>

                                    <div className="space-y-3">
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                                            <span>📞</span>
                                            Call Agent
                                        </button>
                                        <button className="w-full bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                            <span>💬</span>
                                            Whatsapp
                                        </button>
                                        <button className="w-full bg-transparent border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 py-3.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                            <span>📧</span>
                                            Email
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Property Meta  */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-[#1e293b] p-6 rounded-xl border border-white/10"
                                >
                                    <h3 className="text-lg font-bold mb-4">Property Details</h3>

                                    <div className="space-y-0">
                                        <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                                            <span className="text-gray-400"></span>
                                            <span className="font-semibold">#{property.id}</span>
                                        </div>

                                        <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                                            <span className="text-gray-400">Type</span>
                                            <span className="font-semibold">
                                                {property.type === "SALE" ? "For Sale" : "For Rent"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between py-3 border-b border-white/5 text-sm">
                                            <span className="text-gray-400">Listed</span>
                                            <span className="font-semibold">{getTimeAgo(property.createdAt)}</span>
                                        </div>

                                        {postalCode && (
                                            <div className="flex justify-between py-3 text-sm">
                                                <span className="text-gray-400">Postal Code</span>
                                                <span className="font-semibold">{postalCode}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>                        
                </div>
            </Layout>
        </div>
    )
}