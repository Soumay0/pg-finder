import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components';
import type { AdminRequest, User, PG } from '../types';

// Mock data
const mockAdminRequests: AdminRequest[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Priya Singh',
    email: 'priya@example.com',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'Student User',
    role: 'student',
    createdAt: new Date().toISOString(),
  },
];

export const SuperAdminDashboard: React.FC = () => {
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>(mockAdminRequests);
  const [users] = useState<User[]>(mockUsers);
  const [pgs] = useState<PG[]>([]);

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const handleApprove = (id: string) => {
    setAdminRequests(
      adminRequests.map((req) =>
        req.id === id ? { ...req, status: 'approved' } : req
      )
    );
  };

  const handleReject = (id: string) => {
    setAdminRequests(
      adminRequests.map((req) =>
        req.id === id ? { ...req, status: 'rejected' } : req
      )
    );
  };

  const pendingRequests = adminRequests.filter((r) => r.status === 'pending');
  const approvedRequests = adminRequests.filter((r) => r.status === 'approved');
  const rejectedRequests = adminRequests.filter((r) => r.status === 'rejected');

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
          <h1 className="text-4xl font-bold text-dark mb-2">Super Admin Panel</h1>
          <p className="text-gray-600">Manage platform and approve requests</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-primary">{users.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total PGs</h3>
            <p className="text-3xl font-bold text-secondary">{pgs.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Pending Requests</h3>
            <p className="text-3xl font-bold text-accent">{pendingRequests.length}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Approved Admins</h3>
            <p className="text-3xl font-bold text-green-600">{approvedRequests.length}</p>
          </motion.div>
        </motion.div>

        {/* Admin Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">👤 Admin Requests</h2>

          {/* Pending */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-dark mb-4">
              Pending ({pendingRequests.length})
            </h3>
            {pendingRequests.length === 0 ? (
              <p className="text-gray-500">No pending requests</p>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    whileHover={{ scale: 1.01 }}
                    className="border rounded-lg p-4 bg-yellow-50 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-dark mb-1">{req.userName}</h4>
                        <p className="text-sm text-gray-600">{req.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested:{' '}
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                        Pending
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => handleApprove(req.id)}
                      >
                        ✓ Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(req.id)}
                        className="text-red-600 border-red-300"
                      >
                        ✕ Reject
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Approved */}
          {approvedRequests.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-dark mb-4">
                Approved ({approvedRequests.length})
              </h3>
              <div className="space-y-2">
                {approvedRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    className="border border-green-200 rounded-lg p-4 bg-green-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-dark">{req.userName}</h4>
                        <p className="text-sm text-gray-600">{req.email}</p>
                      </div>
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                        Approved
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Rejected */}
          {rejectedRequests.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">
                Rejected ({rejectedRequests.length})
              </h3>
              <div className="space-y-2">
                {rejectedRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    className="border border-red-200 rounded-lg p-4 bg-red-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-dark">{req.userName}</h4>
                        <p className="text-sm text-gray-600">{req.email}</p>
                      </div>
                      <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
                        Rejected
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">👥 Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No users yet</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                >
                  <div>
                    <h4 className="font-bold text-dark">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'student'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
