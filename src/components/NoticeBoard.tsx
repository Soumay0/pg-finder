import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Bell } from 'lucide-react';
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
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="text-purple-400" size={28} />
        <h3 className="text-2xl font-bold text-white">Notices</h3>
      </div>

      {notices.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-3">📢</div>
          <p className="text-gray-400 font-medium">No notices yet</p>
        </motion.div>
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
              whileHover={{ scale: 1.02, y: -2 }}
              className="border-l-4 border-purple-500 bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-r-xl hover:from-purple-500/20 hover:to-pink-500/20 transition-all backdrop-blur-sm border border-white/10"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-2 text-lg">{notice.title}</h4>
                  <p className="text-sm text-gray-300 mb-3 leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="font-medium">By: {notice.author}</span>
                    <span>
                      {new Date(notice.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
                {isAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete?.(notice.id)}
                    className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all flex-shrink-0"
                    title="Delete notice"
                  >
                    <Trash2 size={18} />
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
