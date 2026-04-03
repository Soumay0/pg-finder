import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import type { UserRole } from '../types';

const roleOptions: { value: UserRole; icon: string; label: string; description: string }[] = [
  { value: 'student', icon: '🎓', label: 'Student', description: 'Browse & book PGs' },
  { value: 'owner', icon: '👨‍💼', label: 'Admin', description: 'Admin access (needs approval)' },
];

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const containerChildVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await register(formData.email, formData.password, formData.name, role);
      
      // For admin/owner registration - approval required
      if (role === 'owner' || (result && !result.token)) {
        setError('');
        alert('✅ Admin request submitted! SuperAdmin will review and approve it.\nYou can login after approval.');
        navigate('/login');
      } else if (role === 'student') {
        navigate('/dashboard/student');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
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
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl relative z-10"
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
            className="text-7xl mb-6 drop-shadow-lg inline-block"
          >
            🚀
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Join <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}>PG Finder</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Create your account to get started</p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 relative z-10"
        >
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-red-500/20 border-l-4 border-red-500 text-red-100 px-6 py-4 rounded-lg font-medium backdrop-blur"
              >
                <span className="text-xl">⚠️</span> {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3">
                👤 Full Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                placeholder="John Doe"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3">
                📧 Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3">📋 Select Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`p-4 rounded-lg border-2 transition-all font-medium ${
                      role === option.value
                        ? 'bg-blue-600/50 border-blue-400 text-white'
                        : 'bg-white/10 border-white/20 text-gray-300 hover:border-white/40'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-sm font-bold">{option.label}</div>
                    <div className="text-xs opacity-75">{option.description}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3">
                🔐 Password (min 6 chars)
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                placeholder="••••••••"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-3">
                ✓ Confirm Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
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
                className="text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {loading ? (
                  <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                    Creating account...
                  </motion.span>
                ) : (
                  '🚀 Create Account'
                )}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <span className="text-gray-400 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* Footer Links */}
          <motion.div variants={itemVariants} className="text-center space-y-3 text-sm">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login">
                <span className="text-white font-bold hover:text-blue-400 transition-colors">Login here →</span>
              </Link>
            </p>
            <p className="text-gray-500 text-xs flex justify-center gap-3">
              <Link to="/login/student">
                <span className="text-blue-400 hover:text-blue-300">Student Login</span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/login/owner">
                <span className="text-purple-400 hover:text-purple-300">PG Owner Portal</span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
