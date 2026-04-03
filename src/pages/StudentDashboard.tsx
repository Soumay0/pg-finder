import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import axios from 'axios';
import type { PG } from '../types';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [pgs, setPGs] = useState<PG[]>([]);
  const [filteredPGs, setFilteredPGs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPG, setSelectedPG] = useState<PG | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'favorites'>('browse');

  const [filters, setFilters] = useState({
    search: '',
    city: '',
    minRent: 0,
    maxRent: 100000,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  // Fetch PGs
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiBaseUrl}/pgs`);
        setPGs(response.data.data || []);
      } catch (error) {
        console.error('Error fetching PGs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`favorites_${user?.id}`);
    if (saved) setFavorites(JSON.parse(saved));
  }, [user?.id]);

  // Apply filters
  useEffect(() => {
    const filtered = pgs.filter((pg) => {
      const matchesSearch = pg.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        pg.address?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCity = !filters.city || pg.city?.toLowerCase() === filters.city.toLowerCase();
      const matchesRent = pg.rent >= filters.minRent && pg.rent <= filters.maxRent;
      return matchesSearch && matchesCity && matchesRent;
    });
    setFilteredPGs(filtered);
  }, [pgs, filters]);

  const toggleFavorite = (pgId: string) => {
    const updated = favorites.includes(pgId)
      ? favorites.filter((id) => id !== pgId)
      : [...favorites, pgId];
    setFavorites(updated);
    localStorage.setItem(`favorites_${user?.id}`, JSON.stringify(updated));
  };

  const handleBooking = async (pgId: string) => {
    if (!user) return;
    try {
      await axios.post(
        `${apiBaseUrl}/bookings`,
        { pgId, studentId: user.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('✅ Booking request sent!');
      setSelectedPG(null);
    } catch (error) {
      alert('❌ Booking failed');
    }
  };

  const displayPGs = activeTab === 'favorites' 
    ? filteredPGs.filter((pg) => favorites.includes(pg._id))
    : filteredPGs;

  const cities = Array.from(new Set(pgs.map((pg) => pg.city))).filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
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
        className="relative z-10 max-w-7xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3">
            Find Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>Perfect PG</span>
          </h1>
          <p className="text-xl text-gray-400">Browse verified PG listings in your city</p>
          <p className="text-sm text-gray-500 mt-2">Welcome, {user?.name} 👋</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          variants={itemVariants}
          className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/20 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">🔍 Search</label>
              <input
                type="text"
                placeholder="Search PG name or address..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">🏙️ City</label>
              <select
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/50"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-900">
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Rent */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                💰 Min Rent: ₹{filters.minRent}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={filters.minRent}
                onChange={(e) => setFilters({ ...filters, minRent: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Max Rent */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                💸 Max Rent: ₹{filters.maxRent}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={filters.maxRent}
                onChange={(e) => setFilters({ ...filters, maxRent: Number(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('browse')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 border border-white/20'
            }`}
          >
            🏠 Browse ({filteredPGs.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'favorites'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 border border-white/20'
            }`}
          >
            ❤️ Favorites ({favorites.length})
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex text-5xl"
            >
              ⏳
            </motion.div>
            <p className="text-gray-400 mt-4">Loading PGs...</p>
          </motion.div>
        )}

        {/* PGs Grid */}
        {!loading && displayPGs.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayPGs.map((pg) => (
              <motion.div
                key={pg._id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all cursor-pointer group"
                onClick={() => setSelectedPG(pg)}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform"
                  >
                    🏢
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pg._id);
                    }}
                    className="absolute top-4 right-4 text-2xl bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30"
                  >
                    {favorites.includes(pg._id) ? '❤️' : '🤍'}
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pg.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{pg.address}</p>
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-gray-400">Rent</p>
                      <p className="text-lg font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>
                        ₹{pg.rent}/mo
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-xs text-gray-400">City</p>
                      <p className="text-lg font-bold text-white">{pg.city}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex gap-3 mb-4 text-sm text-gray-300">
                    <span>👥 {pg.capacity || 'N/A'} people</span>
                    <span>📍 {pg.pincode || 'N/A'}</span>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    View Details →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && displayPGs.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No PGs Found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </motion.div>
        )}
      </motion.div>

      {/* Detail Modal */}
      {selectedPG && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPG(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedPG.name}</h2>
                  <p className="text-gray-400">{selectedPG.address}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedPG(null)}
                  className="text-2xl text-gray-400 hover:text-white"
                >
                  ✕
                </motion.button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Rent per Month</p>
                  <p className="text-2xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>
                    ₹{selectedPG.rent}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">City</p>
                  <p className="text-2xl font-bold text-white">{selectedPG.city}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Capacity</p>
                  <p className="text-2xl font-bold text-white">{selectedPG.capacity || 'N/A'} people</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Pincode</p>
                  <p className="text-2xl font-bold text-white">{selectedPG.pincode || 'N/A'}</p>
                </div>
              </div>

              {/* Description */}
              {selectedPG.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                  <p className="text-gray-300">{selectedPG.description}</p>
                </div>
              )}

              {/* Amenities */}
              {selectedPG.amenities && selectedPG.amenities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPG.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm border border-white/20"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBooking(selectedPG._id)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-700 hover:to-pink-700"
                >
                  📅 Send Booking Request
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    toggleFavorite(selectedPG._id)
                  }
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20"
                >
                  {favorites.includes(selectedPG._id) ? '❤️ Saved' : '🤍 Save'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
