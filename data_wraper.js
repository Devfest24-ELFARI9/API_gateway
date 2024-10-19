const express = require('express');
const WebSocket = require('ws');
const { consumeMessages } = require('./Broker_Connector');

// Create WebSocket client
const ws = new WebSocket('ws://localhost:8080');  // WebSocket client connecting to a server
const domain1 = 'sensor-data';
const domain2 = 'power_consumption';  // Updated domain name

// Store a flag to track if WebSocket is ready to send messages
let isWsOpen = false;

// WebSocket event handlers
ws.onopen = () => {
    console.log('Connected to WebSocket server');
    isWsOpen = true;

    // Subscribe to both sensor-data and power-consumption channels after connection
    ws.send(JSON.stringify({ action: 'subscribe', channel: domain1 }));
    ws.send(JSON.stringify({ action: 'subscribe', channel: domain2 }));
};

ws.onmessage = (message) => {
    console.log('Message from server:', message.data);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

// Function to process and send data to WebSocket
const processSensorData = async (queue, data) => {
    if (isWsOpen) {
        // Send data to the WebSocket server for the specific channel (queue)
        ws.send(JSON.stringify({ action: 'send-message', channel: queue, message: data }));
        console.log(`Sent data to channel ${queue}:`, data);
    } else {
        console.log('WebSocket is not open, cannot send data');
    }
    return data;  // Return the processed data
};

// Consume messages and process them using processSensorData for both domains
consumeMessages(domain1, processSensorData);
consumeMessages(domain2, processSensorData);
