import express from 'express';
import { getNotifications, resolveNotificationById } from '../controllers/alertController';

const router = express.Router();

// GET /getNotification/:team
router.get('/getNotification/:team', getNotifications);

// POST /resolveNotification/:id
router.post('/resolveNotification/:id', resolveNotificationById);

export default router;