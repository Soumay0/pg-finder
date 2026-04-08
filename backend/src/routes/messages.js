import express from 'express';
import {
  getAllMessages,
  getMessageThread,
  sendMessage,
  markAsRead,
  deleteMessage,
  getUnreadCount,
} from '../controllers/messageController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getAllMessages);
router.get('/thread/:userId', getMessageThread);
router.post('/send', sendMessage);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);
router.get('/unread/count', getUnreadCount);

export default router;
