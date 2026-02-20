import { motion } from "framer-motion";

export default function PropertyCardSkeleton() {
  return (
    <div className="w-full">
      <motion.div
        className="bg-[#0f172a] rounded-xl overflow-hidden border border-white/10 h-full animate-pulse"
      >
        {/* Image skeleton */}
        <div className="h-48 bg-gray-700" />

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Price */}
          <div className="h-6 w-3/4 bg-gray-600 rounded" />

          {/* Title */}
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-700 rounded" />

          {/* Location */}
          <div className="h-3 w-2/3 bg-gray-700 rounded" />

          {/* Meta */}
          <div className="flex gap-3">
            <div className="h-3 w-10 bg-gray-700 rounded" />
            <div className="h-3 w-10 bg-gray-700 rounded" />
            <div className="h-3 w-12 bg-gray-700 rounded" />
          </div>

          {/* Button */}
          <div className="h-9 w-full bg-gray-600 rounded-lg" />
        </div>
      </motion.div>
    </div>
  );
}
