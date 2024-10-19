import { Request, Response } from 'express';
import axios from 'axios';

// Base URL of the alert service
const alertServiceBaseUrl = process.env.ALERT_SERVICE_BASE_URL || 'http://localhost:3001';

export const getNotifications = async (req: Request, res: Response) => {
    const { team } = req.params;
    try {
        const response = await axios.get(`${alertServiceBaseUrl}/getNotification/${team}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};

export const resolveNotificationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const response = await axios.post(`${alertServiceBaseUrl}/resolveNotification/${id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error resolving notification:', error);
        res.status(500).json({ error: 'Failed to resolve notification' });
    }
};