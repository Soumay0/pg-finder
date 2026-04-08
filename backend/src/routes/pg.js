import express from 'express';
import {
  getAllPGs,
  getPGById,
  createPG,
  updatePG,
  deletePG,
  getMyPGs,
  verifyPG,
} from '../controllers/pgController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPGs);

// Protected routes - specific routes BEFORE generic ones
router.get('/user/my-pgs', authenticate, getMyPGs);
router.post('/', authenticate, authorize(['owner', 'superadmin']), createPG);
router.put('/:id', authenticate, authorize(['owner', 'superadmin']), updatePG);
router.delete('/:id', authenticate, authorize(['owner', 'superadmin']), deletePG);

// SuperAdmin routes
router.put('/:id/verify', authenticate, authorize(['superadmin']), verifyPG);

// Generic route - must be last
router.get('/:id', getPGById);

export default router;
