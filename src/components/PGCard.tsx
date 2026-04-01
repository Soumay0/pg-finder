import React from 'react';
import { motion } from 'framer-motion';
import { PG } from '../types';

interface PGCardProps {
  pg: PG;
  onClick?: () => void;
  index?: number;
}

export const PGCard: React.FC<PGCardProps> = ({ pg, onClick, index = 0 }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.4,
      },
    },
  };

  const hoverVariants = {
    initial: { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
    hover: {
      boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={hoverVariants}
      onClick={onClick}
      className="card p-4 cursor-pointer overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-40 bg-gray-300 rounded-lg overflow-hidden mb-4">
        <motion.img
          src={pg.images[0] || 'https://via.placeholder.com/300x160?text=PG+Image'}
          alt={pg.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        {pg.available && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-2 right-2 bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium"
          >
            Available
          </motion.div>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{pg.title}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pg.description}</p>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div className="text-center">
          <p className="font-medium text-primary">{pg.bedrooms}</p>
          <p className="text-gray-600 text-xs">Bedrooms</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-primary">{pg.bathrooms}</p>
          <p className="text-gray-600 text-xs">Bathrooms</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-green-600">₹{pg.rent}</p>
          <p className="text-gray-600 text-xs">Monthly</p>
        </div>
      </div>

      {/* Location */}
      <p className="text-sm text-gray-600 mb-3">📍 {pg.location}</p>

      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">
            {pg.rating.toFixed(1)} ({pg.reviews} reviews)
          </span>
        </div>
      </div>
    </motion.div>
  );
};
