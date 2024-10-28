// backend/simulation/networkSimulator.js
class NetworkSimulator {
    constructor() {
        // Initialize network nodes
        this.nodes = {
            node1: { traffic: 0, queueSize: 0 },
            node2: { traffic: 0, queueSize: 0 },
            node3: { traffic: 0, queueSize: 0 },
            node4: { traffic: 0, queueSize: 0 }
        };
    }

    // Generate random traffic for a node
    generateTraffic() {
        return Math.floor(Math.random() * 100);
    }

    // Generate random queue size
    generateQueueSize() {
        return Math.floor(Math.random() * 10);
    }

    // Update network state
    updateNetwork() {
        Object.keys(this.nodes).forEach(nodeId => {
            this.nodes[nodeId] = {
                traffic: this.generateTraffic(),
                queueSize: this.generateQueueSize()
            };
        });

        return this.nodes;
    }
}

module.exports = NetworkSimulator;