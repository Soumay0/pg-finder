import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const containerChildVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 9, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl relative z-10"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6 drop-shadow-lg"
          >
            🏠
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Welcome to <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}>PG Finder</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Select your role to continue</p>
        </motion.div>

        {/* Login Options Grid */}
        <motion.div
          variants={containerChildVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Student Login */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group"
          >
            <button
              onClick={() => navigate('/login/student')}
              className="w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-500/30"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎓
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Student</h2>
              <p className="text-blue-200 text-sm">Browse & book PGs</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs text-blue-300 font-mono">→ Find Home</span>
              </div>
            </button>
          </motion.div>

          {/* Owner Login */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group"
          >
            <button
              onClick={() => navigate('/login/owner')}
              className="w-full bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-500/30"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                👨‍💼
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Admin</h2>
              <p className="text-purple-200 text-sm">Admin access (approval required)</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs text-purple-300 font-mono">→ Login as Admin</span>
              </div>
            </button>
          </motion.div>

          {/* Admin Request */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group"
          >
            <button
              onClick={() => navigate('/admin/request')}
              className="w-full bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-500/30"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.3, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                📋
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Admin Request</h2>
              <p className="text-amber-200 text-sm">Request admin access</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs text-amber-300 font-mono">→ Apply Now</span>
              </div>
            </button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group"
          >
            <button
              onClick={() => navigate('/login/superadmin')}
              className="w-full bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-red-500/30"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                👑
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">SuperAdmin</h2>
              <p className="text-red-200 text-sm">Control platform</p>
              <div className="mt-4 flex items-center justify-center">
                <span className="text-xs text-red-300 font-mono">→ System Access</span>
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 my-8"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          <span className="text-gray-400 text-sm font-medium">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-4"
        >
          <p className="text-gray-400 font-medium">
            Don't have an account?{' '}
            <Link to="/register">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="text-white font-bold hover:text-blue-400 transition-colors"
              >
                Create one now →
              </motion.span>
            </Link>
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="text-gray-300 border-gray-500 hover:border-gray-400 hover:text-white"
          >
            ← Back to Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
