// server.js
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Store the clients subscribed to each channel
const channels = {};

// Function to broadcast message to all clients in a specific channel
function broadcastToChannel(channel, message) {
    console.log(`Broadcasting message to channel: ${channel}, message: ${message}`);
    if (channels[channel]) {
        channels[channel].forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ channel, message }));
                console.log(`Message sent to client in channel ${channel}`);
            } else {
                console.log(`Client in channel ${channel} is not ready`);
            }
        });
    } else {
        console.log(`No clients subscribed to channel: ${channel}`);
    }
}

wss.on('connection', (ws) => {
    console.log('New client connected');
    let currentChannel = null;

    ws.on('message', (data) => {
        const parsedData = JSON.parse(data) ;
        const { action, channel, message } = parsedData ;

        console.log(`Received action: ${action}, channel: ${channel}, message: ${message}`);

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
                // Broadcast message to the current channel
                    console.log(`Sending message to channel ${channel}: ${message}`);
                    broadcastToChannel(channel, message);
                
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
