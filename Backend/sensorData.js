import mongoose from 'mongoose';

// Define the schema
const sensorDataSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true
  },
  sensor_value: {
    type: Number,
    required: true
  }
});

// Create the model
const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
