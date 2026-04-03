import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

interface AdminRequestData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  pgName: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface OwnerRequest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isApproved: boolean;
  createdAt?: string;
}

export const SuperAdminDashboard: React.FC = () => {
  const [ownerRequests, setOwnerRequests] = useState<OwnerRequest[]>([]);
  const [adminRequests, setAdminRequests] = useState<AdminRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'owners' | 'admins'>('owners');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  // Fetch owner and admin requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
          setError('⚠️ Authentication required');
          setLoading(false);
          return;
        }

        // Fetch pending owners
        const ownersRes = await axios.get(`${apiBaseUrl}/superadmin/pending-admins`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwnerRequests(ownersRes.data.data || []);

        // Fetch pending admin requests
        const adminsRes = await axios.get(`${apiBaseUrl}/admin-requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pendingAdmins = (adminsRes.data || []).filter((r: AdminRequestData) => r.status === 'pending');
        setAdminRequests(pendingAdmins);
      } catch (err: any) {
        console.error('Error fetching requests:', err);
        const errorMsg = err.response?.data?.message || 'Failed to load requests';
        setError(`❌ ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Approve owner
  const handleApproveOwner = async (userId: string) => {
    try {
      setActionLoading(userId);
      const token = localStorage.getItem('token');
      await axios.put(`${apiBaseUrl}/superadmin/admins/${userId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOwnerRequests(ownerRequests.filter(r => r._id !== userId));
      alert('✅ Owner approved successfully!');
    } catch (err: any) {
      alert(`❌ ${err.response?.data?.message || 'Failed to approve'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject owner
  const handleRejectOwner = async (userId: string) => {
    try {
      setActionLoading(userId);
      const token = localStorage.getItem('token');
      await axios.put(`${apiBaseUrl}/superadmin/admins/${userId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOwnerRequests(ownerRequests.filter(r => r._id !== userId));
      alert('✅ Owner rejected');
    } catch (err: any) {
      alert(`❌ ${err.response?.data?.message || 'Failed to reject'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete owner
  const handleDeleteOwner = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this owner?')) return;
    try {
      setActionLoading(userId);
      const token = localStorage.getItem('token');
      await axios.delete(`${apiBaseUrl}/superadmin/admins/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOwnerRequests(ownerRequests.filter(r => r._id !== userId));
      alert('✅ Owner deleted');
    } catch (err: any) {
      alert(`❌ ${err.response?.data?.message || 'Failed to delete'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Approve admin request
  const handleApproveAdmin = async (requestId: string) => {
    try {
      setActionLoading(requestId);
      const token = localStorage.getItem('token');
      await axios.put(`${apiBaseUrl}/admin-requests/${requestId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminRequests(adminRequests.filter(r => r._id !== requestId));
      alert('✅ Admin request approved!');
    } catch (err: any) {
      alert(`❌ ${err.response?.data?.message || 'Failed to approve'}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Reject admin request
  const handleRejectAdmin = async (requestId: string) => {
    const reason = prompt('Enter rejection reason (optional):');
    try {
      setActionLoading(requestId);
      const token = localStorage.getItem('token');
      await axios.put(`${apiBaseUrl}/admin-requests/${requestId}/reject`, { rejectionReason: reason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminRequests(adminRequests.filter(r => r._id !== requestId));
      alert('✅ Admin request rejected');
    } catch (err: any) {
      alert(`❌ ${err.response?.data?.message || 'Failed to reject'}`);
    } finally {
      setActionLoading(null);
    }
  };

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
            SuperAdmin <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>Dashboard</span>
          </h1>
          <p className="text-xl text-gray-400">Manage owner and admin requests</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500 text-red-100 px-6 py-4 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <p className="text-gray-400 text-sm">Owner Requests</p>
            <p className="text-3xl font-bold text-white">{ownerRequests.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <p className="text-gray-400 text-sm">Admin Requests</p>
            <p className="text-3xl font-bold text-white">{adminRequests.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <p className="text-gray-400 text-sm">Total Pending</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>
              {ownerRequests.length + adminRequests.length}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-2xl font-bold text-green-400">🟢 Active</p>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('owners')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'owners'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 border border-white/20'
            }`}
          >
            🏢 Owner Requests ({ownerRequests.length})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('admins')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'admins'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white/10 text-gray-300 border border-white/20'
            }`}
          >
            📋 Admin Requests ({adminRequests.length})
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
            <p className="text-gray-400 mt-4">Loading requests...</p>
          </motion.div>
        )}

        {/* Owner Requests Tab */}
        {!loading && activeTab === 'owners' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-4"
          >
            {ownerRequests.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 bg-white/10 rounded-lg border border-white/20"
              >
                <p className="text-3xl mb-2">✅</p>
                <p className="text-gray-400">No pending owner requests</p>
              </motion.div>
            ) : (
              ownerRequests.map((owner) => (
                <motion.div
                  key={owner._id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{owner.name}</h3>
                      <p className="text-gray-400 text-sm">📧 {owner.email}</p>
                      {owner.phone && <p className="text-gray-400 text-sm">📱 {owner.phone}</p>}
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-200 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-500/50">
                      Pending
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApproveOwner(owner._id)}
                      disabled={actionLoading === owner._id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === owner._id ? '⏳ Processing...' : '✅ Approve'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRejectOwner(owner._id)}
                      disabled={actionLoading === owner._id}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === owner._id ? '⏳ Processing...' : '❌ Reject'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteOwner(owner._id)}
                      disabled={actionLoading === owner._id}
                      className="px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === owner._id ? '⏳' : '🗑️'}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Admin Requests Tab */}
        {!loading && activeTab === 'admins' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-4"
          >
            {adminRequests.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12 bg-white/10 rounded-lg border border-white/20"
              >
                <p className="text-3xl mb-2">✅</p>
                <p className="text-gray-400">No pending admin requests</p>
              </motion.div>
            ) : (
              adminRequests.map((admin) => (
                <motion.div
                  key={admin._id}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{admin.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-3">
                        <div>📧 {admin.email}</div>
                        <div>📱 {admin.phone}</div>
                        <div>🏢 {admin.pgName}</div>
                        <div>🏙️ {admin.city}</div>
                      </div>
                    </div>
                    <span className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/50 whitespace-nowrap">
                      Pending
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleApproveAdmin(admin._id)}
                      disabled={actionLoading === admin._id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === admin._id ? '⏳ Processing...' : '✅ Approve'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRejectAdmin(admin._id)}
                      disabled={actionLoading === admin._id}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50"
                    >
                      {actionLoading === admin._id ? '⏳ Processing...' : '❌ Reject'}
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
