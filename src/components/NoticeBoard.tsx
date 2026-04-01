import React from 'react';
import { motion } from 'framer-motion';
import type { Notice } from '../types';

interface NoticeBoardProps {
  notices: Notice[];
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({
  notices,
  onDelete,
  isAdmin = false,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-dark mb-6">📢 Notices</h3>

      {notices.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No notices yet</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              variants={itemVariants}
              className="border-l-4 border-primary bg-blue-50 p-4 rounded-r-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-dark mb-1">{notice.title}</h4>
                  <p className="text-sm text-gray-700 mb-2">{notice.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>By: {notice.author}</span>
                    <span>
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDelete?.(notice.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    🗑️
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
