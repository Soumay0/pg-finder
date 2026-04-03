import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

export const AdminRequestPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pgName: '',
    city: '',
    businessDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.pgName || !formData.city) {
      setError('❌ Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/admin-requests`, formData);
      setSuccess('✅ Request submitted successfully! SuperAdmin will review and approve it.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        pgName: '',
        city: '',
        businessDescription: '',
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to submit request';
      setError(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)' }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4 inline-block"
          >
            🏢
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Become a <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>PG Owner</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Submit your request to manage PG listings</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20"
        >
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-green-500/20 border-l-4 border-green-500 text-green-100 px-6 py-4 rounded-lg font-medium mb-6"
            >
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-red-500/20 border-l-4 border-red-500 text-red-100 px-6 py-4 rounded-lg font-medium mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">👤 Full Name *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="Your full name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">📧 Email Address *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="your@email.com"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">📱 Phone Number *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="+91 9876543210"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">🏠 PG Name *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="pgName"
                value={formData.pgName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="Name of your PG"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">🏙️ City *</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="City name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white mb-2">💼 Business Description</label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 focus:bg-white/20"
                placeholder="Tell us about your PG (optional)"
                rows={3}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
                className="text-lg bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? (
                  <motion.span animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1 }}>
                    Submitting...
                  </motion.span>
                ) : (
                  '📤 Submit Request'
                )}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <p className="text-gray-400">
              Already a registered PG owner?
              <Link to="/login">
                <span className="text-white font-bold hover:text-purple-400 ml-2">Login here →</span>
              </Link>
            </p>
            <p className="text-gray-500 text-xs">
              <Link to="/register">
                <span className="text-blue-400 hover:text-blue-300">Student? Register here</span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
