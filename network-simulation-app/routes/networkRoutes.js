// backend/routes/networkRoutes.js
const express = require('express');
const router = express.Router();
const NetworkSimulator = require('../simulation/networkSimulator');

const simulator = new NetworkSimulator();
let simulationInterval;

// Get current network state
router.get('/state', (req, res) => {
    const networkState = simulator.nodes;
    res.json(networkState);
});

// Start simulation
router.post('/start', (req, res) => {
    if (!simulationInterval) {
        simulationInterval = setInterval(() => {
            simulator.updateNetwork();
        }, 1000);
        res.json({ message: 'Simulation started' });
    } else {
        res.json({ message: 'Simulation already running' });
    }
});

// Stop simulation
router.post('/stop', (req, res) => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
        res.json({ message: 'Simulation stopped' });
    } else {
        res.json({ message: 'No simulation running' });
    }
});

module.exports = router;