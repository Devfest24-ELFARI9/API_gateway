const WebSocket = require('ws');
const express = require('express');
const { validateSession } = require('./validate'); // Import the session validation function
const alertRoute = require('./src/routes/alertRoute'); // Import the alert route

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store the clients subscribed to each channel
const channels = {};

// Function to broadcast message to all clients in a specific channel
function broadcastToChannel(channel, message, role) {
    console.log(`Broadcasting message to channel: ${channel}, message: ${message}, role: ${role}`);
    if (channels[channel]) {
        channels[channel].forEach((client) => {
            if (client.readyState === WebSocket.OPEN && (!role || client.role === role)) {
                client.send(JSON.stringify({ channel, message }));
                console.log(`Message sent to client in channel ${channel} with role ${role}`);
            } else {
                console.log(`Client in channel ${channel} is not ready or does not have the role ${role}`);
            }
        });
    } else {
        console.log(`No clients subscribed to channel: ${channel}`);
    }
}

wss.on('connection', async (ws, req) => {
    console.log('New client connected');
    let currentChannel = null;

    // Extract session ID or special identifier from query parameters
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const sessionId = urlParams.get('sessionId');
    const specialIdentifier = urlParams.get('specialIdentifier');

    // Validate the session if no special identifier is provided
    if (!specialIdentifier) {
        const { session, user } = await validateSession(sessionId);
        if (!session) {
            ws.send(JSON.stringify({ error: 'Authentication failed' }));
            ws.close();
            return;
        }
        // Store the user's role in the WebSocket connection
        ws.role = user.role;
    } else {
        // Allow connection for the special identifier without session validation
        ws.role = 'data_wrapper_client';
    }

    ws.on('message', (data) => {
        const parsedData = JSON.parse(data);
        const { action, channel, message, role } = parsedData;

        console.log(`Received action: ${action}, channel: ${channel}, message: ${message}, role: ${role}`);

        switch (action) {
            case 'subscribe':
                // Subscribe the client to the specified channel
                currentChannel = channel;
                if (!channels[channel]) {
                    channels[channel] = [];
                    console.log(`Creating new channel: ${channel}`);
                }
                channels[channel].push(ws);
                console.log(`Client subscribed to channel: ${channel}`);
                ws.send(`Subscribed to channel: ${channel}`);
                break;

            case 'unsubscribe':
                // Unsubscribe the client from the current channel
                if (currentChannel && channels[currentChannel]) {
                    channels[currentChannel] = channels[currentChannel].filter(client => client !== ws);
                    console.log(`Client unsubscribed from channel: ${currentChannel}`);
                    ws.send(`Unsubscribed from channel: ${currentChannel}`);
                    currentChannel = null;
                }
                break;

            case 'send-message':
                // Broadcast message to the current channel with role filtering
                console.log(`Sending message to channel ${channel}: ${message} for role ${role}`);
                broadcastToChannel(channel, message, role);
                break;

            default:
                console.log(`Unknown action received: ${action}`);
                ws.send('Unknown action.');
        }
    });

    // Remove client from any subscribed channel when they disconnect
    ws.on('close', () => {
        if (currentChannel && channels[currentChannel]) {
            channels[currentChannel] = channels[currentChannel].filter(client => client !== ws);
            console.log(`Client disconnected from channel: ${currentChannel}`);
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8080');

// Express server setup for alert service routes
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the alert route
app.use('/alerts', alertRoute);

app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});