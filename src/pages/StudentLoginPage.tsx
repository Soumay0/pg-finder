import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export const StudentLoginPage: React.FC = () => {
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
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
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
      // Students always go to student dashboard
      if (userData.role === 'student') {
        navigate('/dashboard/student');
      } else {
        setError('👨‍🎓 Student account required');
        setLoading(false);
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Invalid email or password';
      setError(`❌ ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-card-hover p-8 w-full max-w-md border border-white/50 backdrop-blur-sm relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-6xl mb-4 drop-shadow-lg"
          >
            🎓
          </motion.div>
          
          <h1 className="text-3xl font-bold text-transparent bg-clip-text mb-2" style={{ backgroundImage: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' }}>
            Student Login
          </h1>
          <p className="text-gray-600 font-medium">Find your perfect PG home</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-lg font-medium shadow-lg"
            >
              ❌ {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-dark mb-3 flex items-center gap-2">
              📧 Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field bg-white"
              placeholder="your@email.com"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-semibold text-dark mb-3 flex items-center gap-2">
              🔐 Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field bg-white"
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
              className="text-lg"
            >
              {loading ? (
                <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                  Logging in...
                </motion.span>
              ) : (
                'Login Now'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="space-y-3 text-center">
          <p className="text-gray-600 mb-3 font-medium">
            Don't have an account?
          </p>
          <Link to="/register">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary-600 font-bold hover:text-primary-700 transition-colors text-lg"
            >
              Create Account →
            </motion.button>
          </Link>
          
          <div className="pt-3 border-t border-gray-200 text-xs space-y-1">
            <p>
              <Link to="/login/owner">
                <span className="text-purple-600 font-bold hover:text-purple-700">→ Owner Portal</span>
              </Link>
            </p>
            <p>
              <Link to="/login/superadmin">
                <span className="text-red-600 font-bold hover:text-red-700">→ SuperAdmin Console</span>
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
