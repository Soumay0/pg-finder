import express from 'express';
import {
  createBooking,
  getMyBookings,
  getPGBookings,
  updateBookingStatus,
  addReview,
} from '../controllers/bookingController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);
router.get('/pg/:pgId', authorize(['owner']), getPGBookings);
router.put('/:id/status', authorize(['owner']), updateBookingStatus);
router.put('/:id/review', authorize(['student']), addReview);

export default router;
