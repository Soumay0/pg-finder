import express from 'express';
import * as adminRequestController from '../controllers/adminRequestController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Submit admin request (public route)
router.post('/', adminRequestController.submitAdminRequest);

// Get all admin requests (superadmin only)
router.get('/', authenticate, adminRequestController.getAllAdminRequests);

// Approve admin request (superadmin only)
router.put('/:requestId/approve', authenticate, adminRequestController.approveAdminRequest);

// Reject admin request (superadmin only)
router.put('/:requestId/reject', authenticate, adminRequestController.rejectAdminRequest);

// Delete admin request (superadmin only)
router.delete('/:requestId', authenticate, adminRequestController.deleteAdminRequest);

export default router;
