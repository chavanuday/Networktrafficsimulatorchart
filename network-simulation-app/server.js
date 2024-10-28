// backend/server.js
const express = require('express');
const cors = require('cors');
const networkRoutes = require('./routes/networkRoutes');

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api/network', networkRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});