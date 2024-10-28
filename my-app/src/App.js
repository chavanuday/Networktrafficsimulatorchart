import React, { useState } from 'react';
import NetworkTopology from './components/NetworkTopology';
import NetworkDashboard from './components/NetworkDashboard';

function App() {
  const [isSimulating, setIsSimulating] = useState(true);  // Start simulation by default

  return (
    <div className="App">
      <NetworkTopology />
      <NetworkDashboard isSimulating={isSimulating} />   {/* Pass the prop */}
      <button 
        onClick={() => setIsSimulating(!isSimulating)}
        className="m-4 px-4 py-2 rounded bg-blue-500 text-white"
      >
        {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
      </button>
    </div>
  );
}

export default App;