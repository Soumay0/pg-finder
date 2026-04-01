import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  count?: number;
  height?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  count = 3,
  height = 'h-40',
  className = '',
}) => {
  const shimmerVariants = {
    shimmer: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={shimmerVariants}
          animate="shimmer"
          className={`${height} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg`}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  const shimmerVariants = {
    shimmer: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="card p-4">
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-4"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2 w-3/4"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-4"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="shimmer"
            className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>
    </div>
  );
};
