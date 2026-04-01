import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? (user?.role === 'student' ? '/dashboard/student' : '/dashboard/admin') : '/'}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold text-primary"
            >
              🏠
            </motion.div>
            <span className="text-xl font-bold hidden sm:inline">PG Finder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="text-dark hover:text-primary"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Register
                </motion.button>
              </>
            ) : (
              <>
                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/dashboard/student"
                      className="text-dark hover:text-primary transition-colors"
                    >
                      Browse PGs
                    </Link>
                    <Link
                      to="/messages"
                      className="flex items-center gap-2 text-dark hover:text-primary transition-colors"
                    >
                      💬 Messages
                    </Link>
                  </>
                )}
                {user?.role === 'admin' && (
                  <>
                    <Link
                      to="/dashboard/admin"
                      className="text-dark hover:text-primary transition-colors"
                    >
                      Manage PGs
                    </Link>
                    <Link
                      to="/messages"
                      className="text-dark hover:text-primary transition-colors"
                    >
                      Messages
                    </Link>
                  </>
                )}
                {user?.role === 'superadmin' && (
                  <>
                    <Link
                      to="/dashboard/superadmin"
                      className="text-dark hover:text-primary transition-colors"
                    >
                      Manage Platform
                    </Link>
                    <Link
                      to="/messages"
                      className="text-dark hover:text-primary transition-colors"
                    >
                      Messages
                    </Link>
                  </>
                )}

                <div className="flex items-center gap-3 ml-4">
                  <span className="text-sm text-gray-600">{user?.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="btn-outline text-sm"
                  >
                    Logout
                  </motion.button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 py-4 space-y-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-light rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsOpen(false);
                  }}
                  className="w-full btn-primary"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                {user?.role === 'student' && (
                  <>
                    <Link
                      to="/dashboard/student"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 hover:bg-light rounded-lg"
                    >
                      Browse PGs
                    </Link>
                    <Link
                      to="/messages"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 hover:bg-light rounded-lg"
                    >
                      Messages
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
