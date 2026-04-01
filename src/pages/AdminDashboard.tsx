import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Modal, NoticeBoard } from '../components';
import type { PG, Notice } from '../types';

// Mock data
const mockPGs: PG[] = [
  {
    id: '1',
    title: '2BHK Modern Apartment',
    description: 'Spacious 2-bedroom apartment',
    location: 'Bangalore, Koramangala',
    rent: 15000,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ['WiFi', 'Water'],
    images: [],
    ownerId: 'user1',
    ownerName: 'Admin User',
    rating: 4.5,
    reviews: 12,
    available: true,
    createdAt: new Date().toISOString(),
  },
];

const mockNotices: Notice[] = [];

export const AdminDashboard: React.FC = () => {
  const [pgs, setPGs] = useState<PG[]>(mockPGs);
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
  });
  const [noticeData, setNoticeData] = useState({
    title: '',
    content: '',
  });

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleAddPG = () => {
    if (
      formData.title &&
      formData.location &&
      formData.rent &&
      formData.bedrooms
    ) {
      const newPG: PG = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        location: formData.location,
        rent: Number(formData.rent),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        amenities: formData.amenities.split(',').map((a) => a.trim()),
        images: [],
        ownerId: 'user1',
        ownerName: 'Admin User',
        rating: 0,
        reviews: 0,
        available: true,
        createdAt: new Date().toISOString(),
      };
      setPGs([...pgs, newPG]);
      setFormData({
        title: '',
        description: '',
        location: '',
        rent: '',
        bedrooms: '',
        bathrooms: '',
        amenities: '',
      });
      setShowAddModal(false);
    }
  };

  const handleAddNotice = () => {
    if (noticeData.title && noticeData.content) {
      const newNotice: Notice = {
        id: String(Date.now()),
        title: noticeData.title,
        content: noticeData.content,
        author: 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setNotices([...notices, newNotice]);
      setNoticeData({ title: '', content: '' });
      setShowNoticeModal(false);
    }
  };

  const handleDeletePG = (id: string) => {
    setPGs(pgs.filter((pg) => pg.id !== id));
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-light py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8">
          <h1 className="text-4xl font-bold text-dark mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your PG listings and notices</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-2 lg:w-1/2"
        >
          <Button variant="primary" onClick={() => setShowAddModal(true)} fullWidth>
            ➕ Add PG
          </Button>
          <Button variant="secondary" onClick={() => setShowNoticeModal(true)} fullWidth>
            📢 Post Notice
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total PGs</h3>
            <p className="text-3xl font-bold text-primary">{pgs.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active Listings</h3>
            <p className="text-3xl font-bold text-secondary">
              {pgs.filter((pg) => pg.available).length}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Notices Posted</h3>
            <p className="text-3xl font-bold text-accent">{notices.length}</p>
          </motion.div>
        </motion.div>

        {/* PG Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">My Listings</h2>
          {pgs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No listings yet</p>
          ) : (
            <div className="space-y-4">
              {pgs.map((pg) => (
                <motion.div
                  key={pg.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-bold text-dark mb-1">{pg.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pg.location}</p>
                    <p className="text-lg font-bold text-green-600">₹{pg.rent}/month</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {}}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeletePG(pg.id)}
                      className="text-red-600 border-red-300"
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NoticeBoard
            notices={notices}
            isAdmin
            onDelete={handleDeleteNotice}
          />
        </motion.div>
      </div>

      {/* Add PG Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New PG"
        size="lg"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="PG Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="input-field"
            rows={3}
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Monthly Rent"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Bedrooms"
              value={formData.bedrooms}
              onChange={(e) =>
                setFormData({ ...formData, bedrooms: e.target.value })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Bathrooms"
              value={formData.bathrooms}
              onChange={(e) =>
                setFormData({ ...formData, bathrooms: e.target.value })
              }
              className="input-field"
            />
          </div>
          <input
            type="text"
            placeholder="Amenities (comma-separated)"
            value={formData.amenities}
            onChange={(e) =>
              setFormData({ ...formData, amenities: e.target.value })
            }
            className="input-field"
          />
          <Button variant="primary" onClick={handleAddPG} fullWidth>
            Add Listing
          </Button>
        </div>
      </Modal>

      {/* Post Notice Modal */}
      <Modal
        isOpen={showNoticeModal}
        onClose={() => setShowNoticeModal(false)}
        title="Post a Notice"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={noticeData.title}
            onChange={(e) =>
              setNoticeData({ ...noticeData, title: e.target.value })
            }
            className="input-field"
          />
          <textarea
            placeholder="Notice Content"
            value={noticeData.content}
            onChange={(e) =>
              setNoticeData({ ...noticeData, content: e.target.value })
            }
            className="input-field"
            rows={4}
          />
          <Button variant="secondary" onClick={handleAddNotice} fullWidth>
            Post Notice
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
};
