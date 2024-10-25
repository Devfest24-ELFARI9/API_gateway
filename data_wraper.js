import express from 'express';
import WebSocket from 'ws';
import { consumeMessages } from './Broker_Connector.js';

// Create WebSocket client with a special identifier
const ws = new WebSocket(`ws://localhost:8080`);  // WebSocket client connecting to a server
const domain1 = 'sensor-data';
const domain2 = 'power_consumption';
const alertQueue = 'alert-queue';  // New domain for alert-queue

// Store a flag to track if WebSocket is ready to send messages
let isWsOpen = false;

// WebSocket event handlers
ws.onopen = () => {
    console.log('Connected to WebSocket server');
    isWsOpen = true;

    // Subscribe to sensor-data, power-consumption, and alert-queue channels after connection
    ws.send(JSON.stringify({ action: 'subscribe', channel: domain1 }));
    ws.send(JSON.stringify({ action: 'subscribe', channel: domain2 }));
    ws.send(JSON.stringify({ action: 'subscribe', channel: alertQueue }));  // Subscribe to alert-queue
};

ws.onmessage = (message) => {
    console.log('Message from server:', message.data);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
    isWsOpen = false; // Update the flag when the connection is closed
};

// Function to process and send data to WebSocket
const processSensorData = async (queue, data) => {
    if (isWsOpen) {
        // Send data to the WebSocket server for the specific channel (queue)
        const message = JSON.stringify({ action: 'send-message', channel: queue, message: data });
        ws.send(message);
        console.log(`Sent data to channel ${queue}:`, data);
    } else {
        console.log('WebSocket is not open, cannot send data');
    }
    return data;  // Return the processed data
};

// Consume messages and process them using processSensorData for all domains
consumeMessages(domain1, processSensorData);
consumeMessages(domain2, processSensorData);
consumeMessages(alertQueue, processSensorData);  // Consume messages from alert-queue