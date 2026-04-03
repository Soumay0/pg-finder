import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                🏠 PG Finder
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className={`text-sm font-medium transition-all relative ${
                  isActive('/') ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
                {isActive('/') && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              
              {user && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (user.role === 'student') navigate('/dashboard/student');
                    else if (user.role === 'owner') navigate('/dashboard/owner');
                    else navigate('/dashboard/superadmin');
                  }}
                  className={`text-sm font-medium transition-all relative text-gray-300 hover:text-white`}
                >
                  Dashboard
                </motion.button>
              )}
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4"
                >
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/20">
                    <p className="text-sm font-medium text-gray-300">
                      👤 {user.name.split(' ')[0]}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
                  >
                    🚪 Logout
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-all"
                  >
                    🔐 Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/register')}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    ✨ Sign Up
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-white/10 bg-slate-800/95 backdrop-blur-sm"
              >
                <div className="px-4 py-4 space-y-3">
                  <motion.button
                    onClick={() => {
                      navigate('/');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all text-gray-300 hover:bg-white/5"
                  >
                    🏠 Home
                  </motion.button>
                  
                  {user && (
                    <motion.button
                      onClick={() => {
                        if (user.role === 'student') navigate('/dashboard/student');
                        else if (user.role === 'owner') navigate('/dashboard/owner');
                        else navigate('/dashboard/superadmin');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all text-gray-300 hover:bg-white/5"
                    >
                      📊 Dashboard
                    </motion.button>
                  )}
                  
                  <div className="border-t border-white/10 pt-3 mt-3 space-y-2">
                    {user ? (
                      <>
                        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                          <p className="text-sm font-medium text-gray-300">👤 {user.name}</p>
                        </div>
                        <motion.button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 font-medium transition-all"
                        >
                          🚪 Logout
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => {
                            navigate('/login');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
                        >
                          🔐 Login
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            navigate('/register');
                            setMobileMenuOpen(false);
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
                        >
                          ✨ Sign Up
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};
