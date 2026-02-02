import { motion } from "framer-motion";
import { Property } from "@/types/Property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { subDistrict, city, province } = property.address ?? {};

  const locationLabel = [
    subDistrict,
    city,
    province
  ].filter(Boolean).join(" , ")

  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ y: -4 }} 
        transition={{ duration: 0.2 }}
        className="bg-[#0f172a] rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-white/10 transition-all cursor-pointer h-full"
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-800">
            {/* Property Image */}
            {property.imageUrl ? (
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy" 
              />
            ) : (
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800"/>
            )}
        
          {/* Type Badge */}
          <span className="absolute top-2 left-2 bg-black/60 text-xs font-semibold text-white px-2.5 py-1 rounded shadow-sm">
            {property.type}
          </span>
          
          {/* 360° Badge */}
          {property.hasPanorama && (
            <span className="absolute top-2 right-2 bg-blue-500 text-xs font-bold text-white px-2 py-1 rounded shadow-sm">
              360°
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Price First - Most prominent */}
          <p className="text-xl font-bold text-white mb-2">
            Rp {property.price.toLocaleString("id-ID")}
          </p>
          
          {/* Title - Readable size, 2 lines */}
          <h2 className="text-sm font-medium text-gray-300 line-clamp-2 leading-snug mb-3 min-h-[2.5rem]">
            {property.title}
          </h2>

          {/* Location */}
          <p className="text-xs text-gray-400 mb-3 flex items-center gap-1 line-clamp-1">
            📍 {locationLabel}
          </p>
          
          {/* Property Meta - Better spacing with icons */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            {property.bedrooms && (
              <span className="flex items-center gap-1">
                🛏️ <span className="font-medium">{property.bedrooms}</span>
              </span>
            )}
            {property.bathrooms && (
              <span className="flex items-center gap-1">
                🚿 <span className="font-medium">{property.bathrooms}</span>
              </span>
            )}
            {property.area && (
              <span className="flex items-center gap-1">
                📐 <span className="font-medium">{property.area}m²</span>
              </span>
            )}
          </div>
          
          {/* CTA Button - More readable */}
          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 transition-colors">
            Lihat Detail
          </button>
        </div>
      </motion.div>
    </div>
  );
}
