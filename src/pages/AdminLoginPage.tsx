import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
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
      
      if (!userData) {
        setError('❌ Login failed - no user data received');
        setLoading(false);
        return;
      }

      // Redirect based on user role
      if (userData.role === 'owner') {
        navigate('/dashboard/owner');
      } else if (userData.role === 'superadmin') {
        navigate('/dashboard/superadmin');
      } else {
        setError('⚠️ Owner access required');
        setLoading(false);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Invalid credentials or not approved yet';
      setError(`❌ ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-400 to-indigo-500 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 255, 255, 0.1)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            👔
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text mb-2" 
              style={{ backgroundImage: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
            Admin Portal
          </h1>
          <p className="text-gray-600 font-medium">Manage your PG listings</p>
          <p className="text-xs text-gray-500 mt-2">⏳ Approval Status: Check with SuperAdmin</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-red-50 border-l-4 border-red-600 text-red-700 px-5 py-4 rounded-lg font-medium"
            >
              ⚠️ {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              📧 Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field bg-gray-50"
              placeholder="admin@example.com"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              🔐 Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field bg-gray-50"
              placeholder="••••••••"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {loading ? (
                <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                  Logging in...
                </motion.span>
              ) : (
                'Login as Admin'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={itemVariants} className="space-y-3 text-center text-sm">
          <p className="text-gray-600">
            New Admin?{' '}
            <Link to="/register">
              <span className="text-purple-600 font-bold hover:text-purple-700">Register here</span>
            </Link>
          </p>
          <p className="text-gray-600 text-xs">
            <Link to="/login/superadmin">
              <span className="text-indigo-600 font-bold hover:text-indigo-700">→ SuperAdmin Login</span>
            </Link>
          </p>
          <p className="text-gray-600 text-xs">
            <Link to="/login/student">
              <span className="text-blue-600 font-bold hover:text-blue-700">→ Student Login</span>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
