import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export const SuperAdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email, password);
      // Verify superadmin role
      if (userData.role === 'superadmin') {
        navigate('/dashboard/superadmin');
      } else {
        setError('👑 SuperAdmin access only');
        setLoading(false);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Invalid credentials';
      setError(`❌ ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 255, 255, 0.08)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 border-t-4 border-red-600"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.25, 1],
              rotate: [0, 15, -15, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 2.8, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            👑
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text mb-2" 
              style={{ backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)' }}>
            SuperAdmin Console
          </h1>
          <p className="text-gray-600 font-medium">Platform Control Center</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-2 w-2 bg-red-600 rounded-full animate-pulse"></div>
            <p className="text-xs text-red-600 font-bold">SYSTEM ACTIVE</p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div 
          variants={itemVariants}
          className="bg-yellow-50 border-l-4 border-yellow-500 px-4 py-3 rounded mb-6"
        >
          <p className="text-xs text-yellow-800 font-semibold">
            🔒 This is a restricted access portal. All actions are monitored.
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-red-50 border-l-4 border-red-600 text-red-700 px-5 py-4 rounded-lg font-medium"
            >
              🚫 {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              📧 SuperAdmin Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field bg-gray-50 font-mono"
              placeholder="superadmin@system.com"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              🔐 Secure Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field bg-gray-50 font-mono tracking-widest"
              placeholder="••••••••••••••••"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              {loading ? (
                <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                  ACCESS GRANTED...
                </motion.span>
              ) : (
                '⚡ ACCESS CONSOLE'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm font-bold">═══</span>
          <div className="flex-1 h-px bg-gray-300" />
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="space-y-3 text-center text-sm">
          <p className="text-gray-600 font-mono text-xs">
            Version 2.0 | System Integrity: ✓ OK
          </p>
          <div className="pt-2 border-t border-gray-200 text-xs text-gray-500">
            <p>
              <Link to="/login/owner">
                <span className="text-purple-600 font-bold hover:text-purple-700">→ Owner Portal</span>
              </Link>
            </p>
            <p>
              <Link to="/login/student">
                <span className="text-blue-600 font-bold hover:text-blue-700">→ Student Login</span>
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
