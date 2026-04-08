import express from 'express';
import {
  getPendingAdminRequests,
  approveAdmin,
  rejectAdmin,
  getAllAdmins,
} from '../controllers/superadminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and superadmin role
router.use(authenticate);
router.use(authorize(['superadmin']));

router.get('/pending-admins', getPendingAdminRequests);
router.get('/admins', getAllAdmins);
router.put('/admins/:userId/approve', approveAdmin);
router.put('/admins/:userId/reject', rejectAdmin);

export default router;
