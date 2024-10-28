// frontend/src/services/networkService.js
const API_URL = 'http://localhost:5000/api/network';

export const networkService = {
    getNetworkState: async () => {
        try {
            const response = await fetch(`${API_URL}/state`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching network state:', error);
            throw error;
        }
    },

    startSimulation: async () => {
        try {
            const response = await fetch(`${API_URL}/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to start simulation');
            }
            return await response.json();
        } catch (error) {
            console.error('Error starting simulation:', error);
            throw error;
        }
    },

    stopSimulation: async () => {
        try {
            const response = await fetch(`${API_URL}/stop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to stop simulation');
            }
            return await response.json();
        } catch (error) {
            console.error('Error stopping simulation:', error);
            throw error;
        }
    }
};