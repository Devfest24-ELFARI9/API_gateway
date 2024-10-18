const express = require('express');
const WebSocket = require('ws');

// Create a simple Express server
const app = express();
const port = 3000;

// Serve the static HTML file for the dashboard
app.use(express.static('public'));

// Start the Express server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
console.log('New client connected');
  
// Send real-time data updates to the client
// create a continous way of doing this maybe by while(true) and always check message brocker for new dsta to send

const interval = setInterval(() => {
    // Simulate fetching new data (you can replace this with actual data fetching logic)

    const data = randomize_data();
    console.log(data);
    // Send data to the client
    ws.send(JSON.stringify(data));
  }, 1000);


});


// Handle client disconnectz
wss.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
    });


const fetch_data = () => {



}

const fetch_data_from  = (id) => {




}

function randomize_numbers() {
    // Generate an array of 5 random numbers between 0 and 100
    const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
    return numbers;
}

const randomize_data = () => {
        // Create a copy of the machine data to avoid modifying the original
        const randomizedData = { };
    
        // Randomize specific fields based on their types
            randomizedData.weld_temperature = Math.random() * (1700 - 1500) + 1500; // Random between 1500 and 1700
            randomizedData.weld_current = Math.random() * (200 - 100) + 100; // Random between 100 and 200
            randomizedData.weld_voltage = Math.random() * (35 - 25) + 25; // Random between 25 and 35
            randomizedData.weld_time = Math.floor(Math.random() * (600 - 400 + 1)) + 400; // Random between 400 and 600
            randomizedData.pressure_applied = Math.floor(Math.random() * (1100 - 900 + 1)) + 900; // Random between 900 and 1100
            randomizedData.wire_feed_rate = (Math.random() * (6 - 4) + 4).toFixed(2); // Random between 4 and 6
            randomizedData.gas_flow_rate = (Math.random() * (25 - 15) + 15).toFixed(2); // Random between 15 and 25
            randomizedData.weld_strength_estimate = Math.floor(Math.random() * (2100 - 1900 + 1)) + 1900; // Random between 1900 and 2100
            randomizedData.vibration_level = (Math.random() * (0.5 - 0.1) + 0.1).toFixed(2); // Random between 0.1 and 0.5
            randomizedData.power_consumption = (Math.random() * (5 - 3) + 3).toFixed(2); // Random between 3 and 5
            randomizedData.force_applied = Math.floor(Math.random() * (550 - 450 + 1)) + 450; // Random between 450 and 550
            randomizedData.cycle_time = (Math.random() * (15 - 10) + 10).toFixed(2); // Random between 10 and 15
            randomizedData.temperature = Math.floor(Math.random() * (80 - 70 + 1)) + 70; // Random between 70 and 80
            randomizedData.vibration_level = (Math.random() * (1.0 - 0.5) + 0.5).toFixed(2); // Random between 0.5 and 1.0
            randomizedData.cycle_count = Math.floor(Math.random() * (1600 - 1400 + 1)) + 1400; // Random between 1400 and 1600
            randomizedData.oil_pressure = (Math.random() * (4 - 3) + 3).toFixed(2); // Random between 3 and 4
            randomizedData.sheet_thickness = (Math.random() * (1.5 - 1.0) + 1.0).toFixed(2); // Random between 1.0 and 1.5
            randomizedData.noise_level = Math.floor(Math.random() * (90 - 80 + 1)) + 80; // Random between 80 and 90
            randomizedData.lubrication_flow_rate = (Math.random() * (1 - 0.5) + 0.5).toFixed(2); // Random between 0.5 and 1.0
            randomizedData.spray_pressure = (Math.random() * (5 - 2.5) + 2.5).toFixed(2); // Random between 2.5 and 5.0
            randomizedData.paint_thickness = Math.floor(Math.random() * (140 - 100 + 1)) + 100; // Random between 100 and 140
            randomizedData.temperature = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Random between 20 and 30
            randomizedData.humidity = Math.floor(Math.random() * (70 - 50 + 1)) + 50; // Random between 50 and 70
            randomizedData.paint_flow_rate = (Math.random() * (5 - 3.5) + 3.5).toFixed(2); // Random between 3.5 and 5.0
            randomizedData.paint_volume_used = (Math.random() * (1 - 0.5) + 0.5).toFixed(2); // Random between 0.5 and 1.0
            randomizedData.atomizer_speed = Math.floor(Math.random() * (22000 - 18000 + 1)) + 18000; // Random between 18000 and 22000
            randomizedData.overspray_capture_efficiency = Math.floor(Math.random() * (100 - 90 + 1)) + 90; // Random between 90 and 100
            randomizedData.booth_airflow_velocity = (Math.random() * (0.6 - 0.4) + 0.4).toFixed(2); // Random between 0.4 and 0.6
            randomizedData.battery_level = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Random between 70 and 100
            randomizedData.load_weight = Math.floor(Math.random() * (600 - 400 + 1)) + 400; // Random between 400 and 600
            randomizedData.speed = (Math.random() * (2 - 1) + 1).toFixed(2); // Random between 1.0 and 2.0
            randomizedData.distance_traveled = Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000; // Random between 1000 and 1500
            randomizedData.temperature = Math.floor(Math.random() * (40 - 30 + 1)) + 30; // Random between 30 and 40
            randomizedData.wheel_rotation_speed = Math.floor(Math.random() * (500 - 300 + 1)) + 300; // Random between 300 and 500
            randomizedData.spindle_speed = Math.floor(Math.random() * (13000 - 10000 + 1)) + 10000; // Random between 10000 and 13000
            randomizedData.tool_wear_level = Math.floor(Math.random() * (40 - 30 + 1)) + 30; // Random between 30 and 40
            randomizedData.cut_depth = (Math.random() * (6 - 4) + 4).toFixed(2); // Random between 4 and 6
            randomizedData.feed_rate = Math.floor(Math.random() * (350 - 250 + 1)) + 250; // Random between 250 and 350
            randomizedData.vibration_level = (Math.random() * (1.5 - 1.0) + 1.0).toFixed(2); // Random between 1.0 and 1.5
            randomizedData.coolant_flow_rate = (Math.random() * (1 - 0.5) + 0.5).toFixed(2); // Random between 0.5 and 1.0
            randomizedData.material_hardness = Math.floor(Math.random() * (220 - 200 + 1)) + 200; // Random between 200 and 220
            randomizedData.chip_load = (Math.random() * (0.4 - 0.2) + 0.2).toFixed(2); // Random between 0.2 and 0.4
            randomizedData.test_pressure = (Math.random() * (6 - 4) + 4).toFixed(2); // Random between 4.0 and 6.0
            randomizedData.pressure_drop = (Math.random() * (0.05 - 0.01) + 0.01).toFixed(2); // Random between 0.01 and 0.05
            randomizedData.leak_rate = (Math.random() * (0.1 - 0) + 0).toFixed(2); // Random between 0.0 and 0.1
            randomizedData.test_duration = Math.floor(Math.random() * (50 - 40 + 1)) + 40; // Random between 40 and 50
            randomizedData.temperature = Math.floor(Math.random() * (30 - 20 + 1)) + 20; // Random between 20 and 30
            randomizedData.status = Math.random() < 0.5 ? 'pass' : 'fail'; // Randomly choose between 'pass' and 'fail'
            randomizedData.fluid_type = Math.random() < 0.5 ? 'air' : (Math.random() < 0.5 ? 'water' : 'oil'); // Randomly choose fluid type
    
    
    
            return randomizedData ;

        }
    