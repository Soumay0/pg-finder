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
  const shimmerVariants: any = {
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
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          variants={shimmerVariants}
          animate="shimmer"
          className={`${height} bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl`}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  const shimmerVariants: any = {
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
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-4">
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-56 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-2xl"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-3/4"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <motion.div
        variants={shimmerVariants}
        animate="shimmer"
        className="h-4 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg w-full"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
      <div className="space-y-3 pt-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            variants={shimmerVariants}
            animate="shimmer"
            className="h-3 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-lg"
            style={{
              backgroundSize: '200% 100%',
            }}
          />
        ))}
      </div>
    </div>
  );
};
