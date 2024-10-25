import express from 'express';
import { getNotifications, resolveNotificationById } from '../controllers/alertController.js';

const router = express.Router();

// GET /getNotification/:team
router.get('/getNotification/:team', getNotifications);

// POST /resolveNotification/:id
router.post('/resolveNotification/:id', resolveNotificationById);

export default router;