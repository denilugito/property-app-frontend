import { motion } from "framer-motion";
import { Property } from "@/types/Property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="w-full">
      <motion.div 
        whileHover={{ y: -4 }} 
        transition={{ duration: 0.2 }}
        className="bg-[#1e2329] rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-white/5 transition-all cursor-pointer h-full"
      >
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden bg-gray-800">
            {/* Property Image */}
            {property.imageUrl ? (
              <img 
                src={property.imageUrl} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy" 
              />
            ) : (
              <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-800"/>
            )}
        
          {/* Type Badge */}
          <span className="absolute top-2 left-2 bg-black/60 text-[9px] font-semibold text-white px-2 py-0.5 rounded shadow-sm">
            {property.type}
          </span>
          
          {/* 360° Badge */}
          {property.hasPanorama && (
            <span className="absolute top-2 right-2 bg-blue-500 text-[9px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm">
              360°
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3">
          {/* Price First - Most prominent */}
          <p className="text-lg font-bold text-white mb-1">
            Rp {property.price.toLocaleString("id-ID")}
          </p>
          
          {/* Title - Smaller, 2 lines */}
          <h2 className="text-xs font-medium text-gray-300 line-clamp-2 leading-tight mb-2">
            {property.title}
          </h2>
          
          {/* Property Meta - Compact with emojis */}
          <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2">
            {property.bedrooms && <span className="flex items-center gap-0.5">🛏️ {property.bedrooms}</span>}
            {property.bathrooms && <span className="flex items-center gap-0.5">🚿 {property.bathrooms}</span>}
            {property.area && <span className="flex items-center gap-0.5">📐 {property.area}m²</span>}
          </div>
          
          {/* CTA Button - Compact */}
          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold py-1.5 transition">
            Lihat Detail
          </button>
        </div>
      </motion.div>
    </div>
  );
}
