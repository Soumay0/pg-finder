import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, MessageCircle, Star, TrendingUp, Users, Building2, Zap } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)' }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="text-center mb-12 relative z-10">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block text-6xl mb-6"
          >
            🏠
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              PG Room Today
            </span>
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Discover affordable, convenient accommodations across your city. Browse, connect, and move in with ease.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
            >
              Start Browsing <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/register')}
              className="px-8 py-3 rounded-lg bg-white/10 border border-white/30 text-white font-bold hover:bg-white/20 transition-all"
            >
              Create Account
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 relative z-10"
        >
          {[
            { icon: Building2, label: 'PGs Listed', value: '500+' },
            { icon: Users, label: 'Happy Users', value: '10K+' },
            { icon: TrendingUp, label: 'Growth Rate', value: '300%' },
            { icon: Zap, label: 'Response Time', value: '<1h' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="inline-block text-3xl mb-3 text-purple-400"
              >
                <stat.icon size={32} />
              </motion.div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">PG Finder</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We make finding your perfect PG easier than ever with cutting-edge features and real-time updates.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
        >
          {[
            {
              icon: Search,
              title: 'Smart Search',
              description: 'Filter by price, amenities, location, and more to find your ideal PG',
            },
            {
              icon: MessageCircle,
              title: 'Direct Messaging',
              description: 'Connect instantly with PG owners and get responses in minutes',
            },
            {
              icon: Star,
              title: 'Verified Listings',
              description: 'All PGs are verified with real photos, reviews, and owner ratings',
            },
            {
              icon: Building2,
              title: 'One-Click Booking',
              description: 'Send booking requests and get instant confirmations',
            },
            {
              icon: Users,
              title: 'Community Ratings',
              description: 'See honest reviews from real students who live there',
            },
            {
              icon: Zap,
              title: 'Fast Support',
              description: 'Get help whenever you need it with our 24/7 support team',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-white/30 transition-all"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-purple-500/20 to-pink-500/20" />

              <div className="relative z-10">
                <motion.div
                  className="inline-block p-3 rounded-lg bg-gradient-to-br from-purple-600/30 to-pink-600/30 mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="text-purple-400" size={24} />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get from searching to moving in just 4 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            { step: 1, emoji: '📝', title: 'Sign Up', desc: 'Create your free account' },
            { step: 2, emoji: '🔍', title: 'Search', desc: 'Browse verified listings' },
            { step: 3, emoji: '💬', title: 'Connect', desc: 'Message owners directly' },
            { step: 4, emoji: '🎉', title: 'Move In', desc: 'Complete your booking' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative"
            >
              {/* Connection Line */}
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-20 w-6 h-1 bg-gradient-to-r from-purple-400 to-pink-400" />
              )}

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 hover:border-white/30 transition-all text-center"
              >
                <motion.div
                  className="inline-block text-5xl mb-4 p-4 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {item.emoji}
                </motion.div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold mx-auto mb-4">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-20"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600/50 to-pink-600/50 p-12 border border-white/10">
          {/* Animated Background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-32 -top-32 w-64 h-64 bg-white opacity-5 rounded-full"
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Perfect Room?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of students who found their ideal PG on our platform. Getting started takes just 2 minutes!
            </p>

            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-8 py-3 rounded-lg bg-white text-purple-600 font-bold hover:bg-gray-100 transition-all"
              >
                Explore Now
              </motion.button>
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="px-8 py-3 rounded-lg bg-white/10 border border-white text-white font-bold hover:bg-white/20 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
