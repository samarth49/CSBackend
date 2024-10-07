// server.js
import express from 'express';
import cors from 'cors'; // Import CORS if needed
import db from './db.js'; 
import SensorData from './sensorData.js'; // Ensure this file is in the same directory

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS if needed

// Define a route to submit sensor data
app.get('/submit_sensor_data', async (req, res) => {
  const sensorValue = req.query.sensor_value;
  const indexValue = req.query.index;

  console.log(`Received sensor value: ${sensorValue}, index: ${indexValue}`);

  // Insert data into MongoDB
  const newSensorValue = new SensorData({ index: indexValue, sensor_value: sensorValue });

  try {
    await newSensorValue.save();
    res.send(`Sensor value ${sensorValue} received successfully at index ${indexValue}!`);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).send('Database error');
  }
});

// Define a route to send messages
app.post('/send_message', async (req, res) => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    // Parse the incoming data
    const data = req.body; // Use req.body directly as Express parses JSON
    console.log("Received message:", data.message);
    
    // Send a response back
    return res.status(200).json({ response: `Server received: ${data.message}` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
