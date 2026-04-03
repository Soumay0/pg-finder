import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Modal, NoticeBoard } from '../components';
import type { PG, Notice } from '../types';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

export const AdminDashboard: React.FC = () => {
  const [pgs, setPGs] = useState<PG[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    pincode: '',
    rent: '',
    capacity: '',
    amenities: '',
    rules: '',
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

  // Fetch admin's PGs from API
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiBaseUrl}/pgs/user/my-pgs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPGs(response.data.data || []);
      } catch (err) {
        console.error('Error fetching PGs:', err);
        setError('Failed to load your listings');
      } finally {
        setLoading(false);
      }
    };

    fetchPGs();
  }, []);

  const handleAddPG = async () => {
    // Validate required fields
    if (!formData.name) {
      setError('🏢 PG name is required');
      return;
    }
    if (!formData.address) {
      setError('📍 Address is required');
      return;
    }
    if (!formData.city) {
      setError('🏙️ City is required');
      return;
    }
    if (!formData.rent) {
      setError('💰 Rent is required');
      return;
    }
    if (!formData.description) {
      setError('📝 Description is required');
      return;
    }
    if (!formData.pincode) {
      setError('📮 Pincode is required');
      return;
    }

    try {
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('⚠️ Authentication required - please log in');
        return;
      }

      const pgData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        rent: Number(formData.rent),
        capacity: Number(formData.capacity),
        amenities: formData.amenities
          .split(',')
          .map((a) => a.trim())
          .filter((a) => a),
        rules: formData.rules
          .split('\n')
          .map((r) => r.trim())
          .filter((r) => r),
      };

      console.log('Sending PG data:', pgData);

      const response = await axios.post(`${apiBaseUrl}/pgs`, pgData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('PG created successfully:', response.data);

      setPGs([...pgs, response.data.data]);
      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        pincode: '',
        rent: '',
        capacity: '',
        amenities: '',
        rules: '',
      });
      setShowAddModal(false);
    } catch (err: any) {
      console.error('Full error object:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add listing';
      setError(`❌ ${errorMessage}`);
    }
  };

  const handleAddNotice = () => {
    if (noticeData.title && noticeData.content) {
      const newNotice: Notice = {
        id: String(Date.now()),
        title: noticeData.title,
        content: noticeData.content,
        author: 'Admin',
        role: 'owner',
        createdAt: new Date().toISOString(),
      };
      setNotices([...notices, newNotice]);
      setNoticeData({ title: '', content: '' });
      setShowNoticeModal(false);
    }
  };

  const handleDeletePG = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiBaseUrl}/pgs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPGs(pgs.filter((pg) => pg._id !== id));
    } catch (err) {
      console.error('Error deleting PG:', err);
      setError('Failed to delete listing');
    }
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your PG listings and notices</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {error}
          </motion.div>
        )}

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
            <p className="text-3xl font-bold text-secondary">{pgs.length}</p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">My Listings</h2>
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading your listings...</p>
          ) : pgs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No listings yet. Click "Add PG" to get started!</p>
          ) : (
            <div className="space-y-4">
              {pgs.map((pg) => (
                <motion.div
                  key={pg._id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 flex justify-between items-start hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{pg.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pg.address}, {pg.city}</p>
                    <p className="text-lg font-bold text-green-600">₹{pg.rent}/month</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {}}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeletePG(pg._id)}
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
            placeholder="PG Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Monthly Rent"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Capacity (Number of people)"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
            className="input-field"
          />
          <input
            type="text"
            placeholder="Amenities (comma-separated, e.g., WiFi, Water, Electricity)"
            value={formData.amenities}
            onChange={(e) =>
              setFormData({ ...formData, amenities: e.target.value })
            }
            className="input-field"
          />
          <textarea
            placeholder="Rules (one per line)"
            value={formData.rules}
            onChange={(e) =>
              setFormData({ ...formData, rules: e.target.value })
            }
            className="input-field"
            rows={3}
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
