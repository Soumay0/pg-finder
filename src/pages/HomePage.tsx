import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🏠
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold text-dark mb-4">
            Find Your Perfect PG
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover affordable, convenient PG accommodations for students.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {[
            {
              icon: '🔍',
              title: 'Easy Search',
              description: 'Filter PGs by location, price, and amenities',
            },
            {
              icon: '💬',
              title: 'Direct Chat',
              description: 'Connect with PG owners instantly',
            },
            {
              icon: '⭐',
              title: 'Ratings & Reviews',
              description: 'Check real user reviews and ratings',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="card p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.section variants={itemVariants} className="mt-20">
          <h2 className="text-4xl font-bold text-dark text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Sign Up', description: 'Create your account' },
              {
                step: 2,
                title: 'Browse',
                description: 'Explore PG listings',
              },
              {
                step: 3,
                title: 'Connect',
                description: 'Chat with owners',
              },
              {
                step: 4,
                title: 'Move In',
                description: 'Find your home',
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                whileHover={{ scale: 1.05 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-primary to-secondary py-16 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Room?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who found their perfect PG on our platform.
          </p>
          <Button variant="outline" onClick={() => navigate('/register')}>
            Start Searching Now
          </Button>
        </div>
      </motion.section>
    </div>
  );
};
