import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Zap } from 'lucide-react';
import type { PG } from '../types';

interface PGCardProps {
  pg: PG;
  onClick?: () => void;
  index?: number;
}

export const PGCard: React.FC<PGCardProps> = ({ pg, onClick, index = 0 }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const hoverVariants: any = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.12,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      boxShadow: '0 25px 50px rgba(168, 85, 247, 0.25)',
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={hoverVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={onClick}
      className="bg-white/5 backdrop-blur-md rounded-2xl p-0 cursor-pointer overflow-hidden border border-white/10 hover:border-white/30 relative group transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
        <motion.img
          src={pg.images[0] || 'https://via.placeholder.com/400x250?text=PG+Home'}
          alt={pg.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Available Badge */}
        {pg.available && (
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute bottom-3 right-3 flex items-center gap-2 text-white px-3 py-2 rounded-full text-xs font-bold backdrop-blur-md bg-green-500/30 border border-green-400/50"
          >
            <Zap size={14} /> Available
          </motion.div>
        )}
        
        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute top-3 left-3 text-white px-3 py-2 rounded-lg text-xs font-bold backdrop-blur-md bg-gradient-to-r from-purple-500/60 to-pink-500/60 border border-white/20 flex items-center gap-1"
        >
          ⭐ {pg.rating.toFixed(1)}
        </motion.div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
        >
          <Heart
            size={18}
            className={`transition-all ${isFavorited ? 'fill-red-400 text-red-400' : 'text-white'}`}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title & Description */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all">
            {pg.title}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">{pg.description}</p>
        </div>

        {/* Location */}
        <motion.div
          whileHover={{ x: 5 }}
          className="flex items-start gap-2 text-sm text-gray-300"
        >
          <MapPin size={16} className="mt-0.5 text-purple-400 flex-shrink-0" />
          <span className="line-clamp-1">{pg.location}</span>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
          >
            <p className="font-bold text-lg text-purple-400">{pg.bedrooms}</p>
            <p className="text-gray-400 text-xs font-medium">Beds</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-3 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <p className="font-bold text-lg text-blue-400">{pg.bathrooms}</p>
            <p className="text-gray-400 text-xs font-medium">Baths</p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
          >
            <p className="font-bold text-lg text-emerald-400">₹{(pg.rent / 1000).toFixed(0)}k</p>
            <p className="text-gray-400 text-xs font-medium">Monthly</p>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between pt-3 border-t border-white/10"
        >
          <div className="text-xs text-gray-400 font-medium">
            {pg.reviews} {pg.reviews === 1 ? 'review' : 'reviews'}
          </div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-lg"
          >
            ⭐
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
