const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fitness-tracker';

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Test schema and model
const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

// Route to add a test document (use POST and handle errors)
app.post('/add-test', async (req, res) => {
    try {
        const { name } = req.body;
        const doc = new Test({ name: name || 'Hello MongoDB' });
        const savedDoc = await doc.save();
        res.status(201).json(savedDoc);
    } catch (err) {
        console.error('Error saving test document:', err);
        res.status(500).json({ error: 'Failed to save document' });
    }
});

// FitnessDay schema and model
const FitnessDaySchema = new mongoose.Schema({
  steps: String,
  stride: String,
  calories: String,
  water: String,
  workout: String,
  height: String,
  weight: String,
  heartRate: String,
  sleep: String,
  bmi: String,
  distance: String,
});
const FitnessDay = mongoose.model('FitnessDay', FitnessDaySchema);

// Route to get all fitness days (for debugging)
app.get('/all-days', async (req, res) => {
  try {
    const days = await FitnessDay.find();
    res.json(days);
  } catch (err) {
    console.error('Error fetching fitness days:', err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Route to add a fitness day document
app.post('/add-day', async (req, res) => {
  try {
    console.log('Received data for /add-day:', req.body);
    const doc = new FitnessDay(req.body);
    const savedDoc = await doc.save();
    console.log('Saved document:', savedDoc);
    res.status(201).json(savedDoc);
  } catch (err) {
    console.error('Error saving fitness day:', err);
    res.status(500).json({ error: 'Failed to save document' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});