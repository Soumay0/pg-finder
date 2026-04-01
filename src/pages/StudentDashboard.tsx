import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PGCard, Modal, Button, CardSkeleton } from '../components';
import type { PG } from '../types';

// Mock data - replace with actual API calls
const mockPGs: PG[] = [
  {
    id: '1',
    title: '2BHK Modern Apartment',
    description: 'Spacious 2-bedroom apartment with modern amenities',
    location: 'Bangalore, Koramangala',
    rent: 15000,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Water', 'Electricity', 'Parking'],
    images: ['https://via.placeholder.com/300x160?text=PG+1'],
    ownerId: 'owner1',
    ownerName: 'Rajesh Kumar',
    rating: 4.5,
    reviews: 12,
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '1BHK Compact Room',
    description: 'Budget-friendly single bedroom with essential amenities',
    location: 'Bangalore, Indiranagar',
    rent: 8000,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Water'],
    images: ['https://via.placeholder.com/300x160?text=PG+2'],
    ownerId: 'owner2',
    ownerName: 'Priya Singh',
    rating: 4.0,
    reviews: 8,
    available: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: '3BHK Luxury Villa',
    description: 'Premium 3-bedroom villa with pool and gym',
    location: 'Bangalore, Whitefield',
    rent: 25000,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ['WiFi', 'Water', 'Electricity', 'Parking', 'Pool', 'Gym'],
    images: ['https://via.placeholder.com/300x160?text=PG+3'],
    ownerId: 'owner3',
    ownerName: 'Vikram Patel',
    rating: 4.8,
    reviews: 20,
    available: true,
    createdAt: new Date().toISOString(),
  },
];

export const StudentDashboard: React.FC = () => {
  const [pgs] = useState<PG[]>(mockPGs);
  const [selectedPG, setSelectedPG] = useState<PG | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    maxRent: 50000,
  });

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

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'maxRent' ? Number(value) : value,
    });
  };

  const filteredPGs = pgs.filter(
    (pg) =>
      (!filters.location || pg.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      pg.rent <= filters.maxRent
  );

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" className="min-h-screen bg-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-dark mb-2">Browse PG Listings</h1>
          <p className="text-gray-600">Find your perfect living space</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-dark mb-4">🔍 Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Search by location..."
                className="input-field"
              />
            </div>
            <div>
              <label className="label">
                Max Rent: ₹{filters.maxRent.toLocaleString()}
              </label>
              <input
                type="range"
                name="maxRent"
                min="0"
                max="100000"
                value={filters.maxRent}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-bold text-primary">{filteredPGs.length}</span> PGs
          </p>
        </motion.div>

        {/* Grid */}
        {false ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPGs.map((pg, index) => (
              <PGCard
                key={pg.id}
                pg={pg}
                index={index}
                onClick={() => setSelectedPG(pg)}
              />
            ))}
          </motion.div>
        )}

        {filteredPGs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-gray-600 mb-4">😔 No PGs found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedPG}
        onClose={() => setSelectedPG(null)}
        title={selectedPG?.title || 'PG Details'}
        size="lg"
      >
        {selectedPG && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-dark">{selectedPG.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-green-600">₹{selectedPG.rent}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-yellow-500">
                  ★ {selectedPG.rating}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-dark mb-2">Amenities</p>
              <div className="flex flex-wrap gap-2">
                {selectedPG.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Owner</p>
              <p className="text-dark font-medium">{selectedPG.ownerName}</p>
            </div>

            <div className="pt-4 border-t">
              <Button variant="primary" fullWidth>
                💬 Contact Owner
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>
    </motion.div>
  );
};
